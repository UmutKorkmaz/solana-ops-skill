# Provider Comparison And Failover

Use this file when selecting Solana RPC providers, designing failover, or comparing endpoint behavior.

## Compare By Workload

- Reads: latency, rate limits, data freshness, archive needs
- Sends: transaction forwarding quality, preflight behavior, prioritization support
- Websockets: stability, reconnect behavior, subscription limits
- Indexing: historical data, enhanced APIs, backfill support
- Operations: status page, support, regional endpoints, cost controls

## Failover Rules

- Define traffic classes before failover: read, send, archive, websocket, indexing.
- Avoid switching endpoints mid-confirmation unless the confirmation logic can tolerate it.
- Keep endpoint labels in logs.
- Use health checks that match real workload, not only `getHealth`.
- Set cost and rate-limit guardrails.

## Output

Return a provider matrix and a failover policy with health criteria, switch criteria, cooldown, and verification.
