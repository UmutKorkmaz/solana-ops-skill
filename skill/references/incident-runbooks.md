# Incident Runbooks

Use this file during an active production incident or when creating a postmortem for Solana-specific reliability failures.

## Source Anchors

- Solana RPC overview: https://solana.com/docs/rpc
- Transaction confirmation and expiration: https://solana.com/developers/guides/advanced/confirmation
- Solana websocket methods: https://solana.com/docs/rpc/websocket

This runbook is for production operations. Do not make private-key, custody, or irreversible protocol changes from an incident channel without the team's normal approval path.

## First 15 Minutes

1. Declare severity and affected user journey.
2. Freeze unrelated deployments.
3. Capture timestamps, recent deploys, RPC/provider changes, and error-rate changes.
4. Identify whether the issue affects reads, sends, confirmations, indexers, or program execution.
5. Pick one owner for communications and one owner for technical mitigation.
6. Collect at least three concrete examples: signature, account, user flow, request id, or missing event.

## Severity Guide

| Severity | User impact | Examples | Response |
| --- | --- | --- | --- |
| SEV1 | Funds, settlement, or critical signing path at risk | Duplicate settlement, stuck withdrawals, unsafe signing | Page owners, disable unsafe flow |
| SEV2 | Major production flow degraded | Checkout landing failures, stale balances, indexer drift | Mitigate within current window |
| SEV3 | Partial degradation | One provider down, noncritical websocket lag | Ticket and monitor |
| SEV4 | No active user impact | Cost spike, alert gap, testnet issue | Backlog with owner |

## Evidence Checklist

- Example signatures and failed request IDs
- RPC endpoint labels and provider status
- Error rates by method
- Slot/block height gap
- Transaction lifecycle timeline
- Program logs if failures landed on-chain
- User-visible impact and financial impact
- Commitment levels used by UI and backend
- Websocket reconnects, cursor positions, and backfill status
- Fee/CU changes, deploys, config flips, and provider changes in the incident window

## Incident Classification

| Class | Primary evidence | Immediate question |
| --- | --- | --- |
| RPC read degradation | Stale slots, high latency, 429/503 | Can reads fail over without consistency risk? |
| Send degradation | Signatures not seen or send errors | Is forwarding degraded on one provider? |
| Expiry/confirmation | Block height exceeds last valid height | Are expired signed bytes being retried? |
| Program failure | Landed tx logs show program error | Did state, input, or deployment change? |
| Indexer drift | Chain state differs from database | What cursor/backfill range is missing? |
| Websocket loss | Disconnects or missing notifications | Was replay/backfill executed? |

## Mitigation Options

- Fail over only the degraded traffic class.
- Disable non-critical transaction flows.
- Lower retry pressure.
- Pause background jobs that compete for RPC capacity.
- Switch UI state to degraded mode with clear recovery behavior.
- Run backfill/reconciliation before reopening the flow.
- Raise priority fees only with a temporary ceiling and post-incident cost review.
- Rebuild and re-sign expired transactions instead of replaying stale signed bytes.

## Communication Template

Use plain status updates:

- Impact: affected flow and user-visible symptom
- Scope: percentage, region, provider, or transaction family
- Mitigation: current action and expected signal
- ETA: next update time, not a guessed resolution time
- User action: whether users should retry, wait, or avoid a flow

## Postmortem Shape

- Summary
- Impact
- Timeline
- Root cause
- Detection gap
- What worked
- What failed
- Corrective actions with owners
- Verification evidence
- Follow-up monitoring added

## Corrective Action Standards

Every corrective action needs:

- Owner
- Due date
- Verification method
- Rollback plan if it changes production behavior
- Dashboard or log query proving the fix works

Good corrective actions are observable: "add blockheight-based expiry handling and staging test" is better than "improve retries".

## Output

During an incident, return:

- Severity and current impact
- Timeline so far
- Evidence table
- Mitigation owner, next action, expected signal, and rollback
- Next update time

Afterward, return a postmortem in the shape above.
