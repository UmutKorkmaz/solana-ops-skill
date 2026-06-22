# Transaction Landing

Use this file when transactions simulate successfully but do not land, signatures disappear, blockhashes expire, confirmation times out, or users see intermittent payment failures.

## Source Anchors

- Solana transactions: https://solana.com/docs/core/transactions
- Transaction confirmation and expiration: https://solana.com/developers/guides/advanced/confirmation
- Solana RPC methods: https://solana.com/docs/rpc

Recent blockhash transactions expire by block height. Do not use wall-clock time alone to decide whether a normal transaction has expired.

## Evidence To Collect

- Transaction signature and timestamp
- Transaction build time, wallet signing start/end time, and first send time
- Latest blockhash, last valid block height, and current block height during send
- Simulation result and logs
- Compute units consumed in simulation
- Priority fee and compute unit limit instructions
- RPC endpoint used for simulation, send, and confirmation
- Wallet signing delay and user approval time
- Retry count and whether the same signed transaction was resent
- Whether the transaction is legacy, v0, or durable nonce
- Whether the signature ever appears in `getSignatureStatuses` or explorer data

## Common Failure Modes

- Stale blockhash caused by slow user signing or queued backend sends
- Confirmation loop watches the wrong commitment or endpoint
- Simulation endpoint differs from send endpoint and sees different state
- Compute limit too low despite successful local assumptions
- Priority fee too low during congestion
- Program state changes between simulation and landing
- Wallet or backend resubmits expired signed bytes
- Transaction too large or has too many accounts/instructions
- Backend marks success at `processed` while the product requires stronger settlement

## Recommended Procedure

1. Reconstruct the transaction lifecycle from build to final confirmation.
2. Confirm whether the signature reached the cluster.
3. Compare `getSignatureStatuses` from the send endpoint and one independent endpoint.
4. Check blockhash validity at send time.
5. Compare simulation logs with landed or failed on-chain logs.
6. Check whether the same signed bytes were retried after expiry.
7. Tune CU and priority fee from observed simulation and recent fee data.

## Lifecycle Timeline

Require a timeline before recommending code changes:

| Stage | Required evidence | Failure signal |
| --- | --- | --- |
| Build | blockhash, last valid block height, endpoint | Old blockhash or wrong cluster |
| Sign | wallet approval latency | User delay consumes validity window |
| Send | endpoint, preflight setting, send error | RPC/network/provider failure |
| Observe | signature status on 2 endpoints | Signature never seen or endpoint drift |
| Confirm | commitment, block height | Polling past expiry or wrong commitment |
| Settle | backend reconciliation | UI says success but backend disagrees |

## Blockhash Expiry Rule

For normal recent-blockhash transactions:

1. Store `blockhash` and `lastValidBlockHeight` from `getLatestBlockhash`.
2. Send and confirm against a known endpoint.
3. Poll `getBlockHeight` at `confirmed`.
4. If current block height exceeds `lastValidBlockHeight` and the signature is not confirmed, treat it as expired.
5. Rebuild the transaction and request a new signature. Do not resend the same expired signed bytes.

## Fix Patterns

- Build and sign close to send time.
- Refresh blockhash before wallet signing if the flow can stall.
- Use explicit confirmation by block height, not open-ended polling.
- Add a clear expired-blockhash branch that rebuilds and re-signs.
- Use endpoint labels in transaction telemetry.
- For offline or long-delay signing, evaluate durable nonces instead of extending unsafe retry loops.
- Keep simulation, send, and confirmation endpoint choices observable.

## Bad Advice To Avoid

- Do not call a transaction failed just because a short timeout elapsed.
- Do not call it successful only because `sendTransaction` returned a signature.
- Do not retry indefinitely after blockhash expiry.
- Do not set `skipPreflight` by default for user-fund flows.
- Do not solve every landing issue by raising priority fees before checking blockhash age and RPC health.

## Output

Return:

- Lifecycle timeline: `built`, `signed`, `sent`, `first seen`, `confirmed/finalized`, `expired/failed`
- Root-cause class: blockhash, RPC, fee/CU, program, wallet, confirmation, or indexer
- Smallest code/config change
- Verification probe or test
- Rollback path
