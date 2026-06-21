# Production Readiness Check

Use this command before a Solana app or backend launch.

## Checklist

- Transaction lifecycle telemetry exists
- RPC endpoints are labeled and health-checked
- Blockhash expiry is handled explicitly
- Confirmation states are product-defined
- Priority fee and CU settings are observable
- Websocket listeners have reconnect and backfill
- Indexers expose lag and reconciliation
- Paid RPC calls have rate limits and budgets
- Incident runbook and rollback path exist

## Output

Return `ready`, `ready with risks`, or `not ready`, with prioritized fixes.
