# End-To-End Demo

This demo shows how an agent should use Solana Ops Skill during a realistic production incident. The values are realistic placeholders, not customer data.

## User Prompt

```text
Our Solana checkout flow started failing intermittently after yesterday's deploy.
Some users see a signature, but the backend marks the payment as failed.
Can you diagnose whether this is an RPC, fee, blockhash, or confirmation issue?
```

## Progressive Loading Path

The agent starts at [skill/SKILL.md](skill/SKILL.md) and loads only the relevant references:

1. [skill/references/transaction-landing.md](skill/references/transaction-landing.md)
2. [skill/references/rpc-health.md](skill/references/rpc-health.md)
3. [skill/references/priority-fees-compute.md](skill/references/priority-fees-compute.md)
4. [skill/references/incident-runbooks.md](skill/references/incident-runbooks.md)

The agent does not load unrelated files such as provider comparison or websocket/indexer drift unless evidence points there.

## Evidence Collected

| Signal | Example evidence |
| --- | --- |
| Affected flow | Checkout payment confirmation |
| Deploy window | `2026-06-22T18:12:00Z` backend deploy |
| RPC endpoints | `primary-rpc-eu`, `backup-rpc-us` |
| Commitment | UI reads `confirmed`, backend settlement waits for `finalized` |
| Signature | `5YbDemoSig111111111111111111111111111111111111111` |
| Transaction built | `2026-06-22T18:21:03Z` |
| Wallet approved | `2026-06-22T18:23:35Z` |
| First send | `2026-06-22T18:23:39Z` |
| Last valid block height | `315902144` |
| Block height at first send | `315902161` |
| Simulation result | Passed at build time, `unitsConsumed=182440` |
| Current CU limit | `220000` |
| Priority fee | `5000` micro-lamports/CU |
| RPC health | `primary-rpc-eu` slot fresh, no `sendTransaction` 5xx spike |
| Retry behavior | Same signed bytes resent three times after expiry |

## Agent Diagnosis

### Finding

High confidence: the failures are caused by blockhash expiry during wallet approval, followed by retrying the same expired signed transaction bytes.

This is not primarily an RPC outage or priority fee issue. RPC health was acceptable, simulation passed, compute limit had reasonable headroom, and the first send happened after `lastValidBlockHeight`.

### Evidence

- The transaction was built at `18:21:03Z`, but wallet approval completed at `18:23:35Z`.
- The app first sent the signed transaction at block height `315902161`.
- The transaction's `lastValidBlockHeight` was `315902144`.
- The retry loop resent the same signed bytes three times.
- `sendTransaction` returned a signature-like response in one attempt, but `getSignatureStatuses` did not confirm it before expiry.
- RPC probes did not show slot lag or method-specific `sendTransaction` degradation during the window.

### Fix

Change the checkout sender to confirm by block height and rebuild expired transactions:

1. Store `blockhash` and `lastValidBlockHeight` from `getLatestBlockhash`.
2. Before first send, compare current `getBlockHeight` with `lastValidBlockHeight`.
3. If expired, rebuild the transaction and request a new wallet signature.
4. Stop retrying the same signed bytes after expiry.
5. Keep endpoint labels in transaction telemetry.

### Verification

Add a staging test that forces wallet approval delay past `lastValidBlockHeight` and asserts:

- the expired signed transaction is never resent,
- a fresh blockhash is fetched,
- a new signature is requested,
- the backend marks the original attempt as `expired`, not `failed`,
- the rebuilt transaction reaches `confirmed` or `finalized` according to the product's settlement policy.

### Rollback

If the change increases checkout friction, roll back only the new rebuild branch and keep the added telemetry. Do not remove block height logging.

### Follow-Up Hardening

- Add metric: `checkout.blockhash_expired_before_send.count`
- Add metric: `checkout.wallet_approval_latency_ms`
- Add alert when more than 2% of checkout transactions expire before first send in 15 minutes
- Add dashboard panel for transaction lifecycle stages: built, signed, sent, first seen, confirmed, finalized, expired

## Expected Agent Output Shape

```text
Finding: Blockhash expiry before first send; high confidence.
Evidence: Built/signed/sent timeline, lastValidBlockHeight, block height at send, retry behavior, RPC health.
Fix: Rebuild and re-sign when expired; stop resending expired signed bytes.
Verification: Staging delayed-wallet test and production lifecycle telemetry.
Rollback: Disable rebuild branch while preserving telemetry.
Open questions: Confirm wallet approval latency distribution across all failed checkout attempts.
```
