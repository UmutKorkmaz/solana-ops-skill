# RPC Health

Use this file when a Solana app has slow reads, inconsistent balances, `429`, `503`, `Blockhash not found`, stale slots, high latency, or provider-specific failures.

## Source Anchors

- Solana RPC overview: https://solana.com/docs/rpc
- `getHealth`: https://solana.com/docs/rpc/http/gethealth
- Transaction confirmation guide: https://solana.com/developers/guides/advanced/confirmation

Public Solana RPC endpoints are shared infrastructure and are not intended for production traffic. Treat `429` as rate limiting and `403` as blocked traffic unless evidence says otherwise.

## Evidence To Collect

- RPC URL label, provider, region, and commitment used by the app
- `getHealth`, `getSlot`, `getMaxShredInsertSlot`, `getBlockHeight`, `getLatestBlockhash`, and `getVersion` from each candidate endpoint
- Latency distribution from repeated samples, not a single request
- Error rate by method: `sendTransaction`, `simulateTransaction`, `getProgramAccounts`, `getSignaturesForAddress`, websocket subscriptions
- Current slot gap against at least one independent endpoint
- Whether the app uses the same endpoint for reads, sends, simulation, confirmation, archive queries, and websocket subscriptions
- Provider dashboard incidents, rate-limit headers, and quota counters when available

## Minimum Probe Set

Run the same probe set against every candidate endpoint using the same commitment:

```bash
curl -s "$RPC_URL" -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'
curl -s "$RPC_URL" -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"getSlot","params":[{"commitment":"confirmed"}]}'
curl -s "$RPC_URL" -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"getMaxShredInsertSlot"}'
curl -s "$RPC_URL" -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"getLatestBlockhash","params":[{"commitment":"confirmed"}]}'
```

If the user has application telemetry, prefer real production method latency and error rates over synthetic probes.

## Diagnosis Pattern

1. Compare slots across endpoints at the same commitment.
2. Compare `getSlot` with `getMaxShredInsertSlot`; a large gap means the node is receiving block data ahead of what it has processed.
3. Check if failures are method-specific. A read endpoint may work while `sendTransaction` is degraded.
4. Identify rate limiting separately from network lag.
5. Check whether the app pins one endpoint for all traffic.
6. Check if retry logic amplifies overload with tight loops or fanout to every provider.

## Triage Matrix

| Symptom | Likely cause | Confirm with | First fix |
| --- | --- | --- | --- |
| `getHealth` not ok | Node behind cluster tip | Slot gap, provider incident | Remove from pool temporarily |
| `429` | Rate limit or quota | Headers, provider dashboard, method volume | Reduce polling, cache, move heavy reads |
| Reads stale, sends ok | Lagging read node | Slot and blockhash comparison | Fail over reads only |
| Sends fail, reads ok | Forwarding or preflight issue | `sendTransaction` error rate, signature visibility | Route sends to send-healthy endpoint |
| High `getProgramAccounts` latency | Expensive unindexed read | Method-level latency | Add indexing/cache or filtered queries |
| Many retry bursts | App retry storm | Request concurrency, identical errors | Add bounded retry with jitter |

## Good Fixes

- Split read, send, archive/indexing, and websocket workloads when appropriate.
- Use bounded retries with jitter and clear stop conditions.
- Add provider failover only after defining consistency rules.
- Cache static data and avoid repeated expensive `getProgramAccounts` calls.
- Log endpoint label, commitment, method, slot, block height, and request id with every failed request.
- Use a cooldown window before returning a recovered endpoint to the pool.

## Bad Advice To Avoid

- Do not blindly rotate RPC providers without proving the failure mode.
- Do not send every request to every endpoint unless the cost, consistency model, and rate limits are understood.
- Do not compare `processed` on one endpoint with `confirmed` or `finalized` on another and call it drift.
- Do not rely on `getHealth` alone; it is a useful coarse signal, not a workload-level health check.
- Do not put public shared RPC endpoints in a production hot path.

## Output

Return:

- Endpoint matrix with slot, shred slot, block height, latency, error rate, commitment, and recommendation
- Traffic-class decision: read, send, confirmation, websocket, archive/indexer
- Failover criteria, cooldown, and verification window
- Open evidence gaps
