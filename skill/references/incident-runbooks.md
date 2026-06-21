# Incident Runbooks

Use this file during an active production incident or when creating a postmortem for Solana-specific reliability failures.

## First 15 Minutes

1. Declare severity and affected user journey.
2. Freeze unrelated deployments.
3. Capture timestamps, recent deploys, RPC/provider changes, and error-rate changes.
4. Identify whether the issue affects reads, sends, confirmations, indexers, or program execution.
5. Pick one owner for communications and one owner for technical mitigation.

## Evidence Checklist

- Example signatures and failed request IDs
- RPC endpoint labels and provider status
- Error rates by method
- Slot/block height gap
- Transaction lifecycle timeline
- Program logs if failures landed on-chain
- User-visible impact and financial impact

## Mitigation Options

- Fail over only the degraded traffic class.
- Disable non-critical transaction flows.
- Lower retry pressure.
- Pause background jobs that compete for RPC capacity.
- Switch UI state to degraded mode with clear recovery behavior.
- Run backfill/reconciliation before reopening the flow.

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

## Output

During an incident, return a live runbook with owner, next action, expected signal, and rollback. Afterward, return a postmortem in the shape above.
