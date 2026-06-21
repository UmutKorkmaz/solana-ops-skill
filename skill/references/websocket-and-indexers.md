# Websocket And Indexers

Use this file when listeners miss account updates, websocket subscriptions disconnect, backend state diverges from chain state, or an indexer lags behind RPC reads.

## Evidence To Collect

- Subscription type and commitment
- Last observed slot and last processed signature
- Reconnect events, close codes, and heartbeat timing
- Backfill strategy after reconnect
- Source of truth for indexed data
- Lag between chain slot and indexed slot
- Idempotency behavior for duplicate events

## Procedure

1. Treat websocket data as a notification stream, not the only source of truth.
2. Track last processed slot/signature per subscription.
3. On reconnect, backfill with RPC or provider indexing APIs.
4. Compare indexed state with direct account reads for sampled accounts.
5. Alert on lag and on missing heartbeat.

## Fix Patterns

- Add heartbeat and reconnect with jitter.
- Persist cursors before side effects when possible.
- Make event handlers idempotent.
- Build periodic reconciliation for balances, orders, positions, and payments.
- Expose indexer lag in health checks.

## Bad Advice To Avoid

- Do not assume one websocket connection is reliable enough for accounting.
- Do not ignore duplicate notifications.
- Do not skip backfill after reconnect.

## Output

Return the drift source, recovery plan, replay/backfill plan, and prevention checklist.
