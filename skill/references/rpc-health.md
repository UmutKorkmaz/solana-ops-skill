# RPC Health

Use this file when a Solana app has slow reads, inconsistent balances, `429`, `503`, `Blockhash not found`, stale slots, high latency, or provider-specific failures.

## Evidence To Collect

- RPC URL label, provider, region, and commitment used by the app
- `getHealth`, `getSlot`, `getBlockHeight`, `getLatestBlockhash`, and `getVersion` from each candidate endpoint
- Latency distribution, not just one request
- Error rate by method: `sendTransaction`, `simulateTransaction`, `getProgramAccounts`, `getSignaturesForAddress`, websocket subscriptions
- Current slot gap against at least one independent endpoint
- Provider dashboard incidents or rate-limit responses

## Diagnosis Pattern

1. Compare slots across endpoints at the same commitment.
2. Check if failures are method-specific. A read endpoint may work while `sendTransaction` is degraded.
3. Identify rate limiting separately from network lag.
4. Check whether the app pins one endpoint for all traffic.
5. Check if retry logic amplifies overload with tight loops.

## Good Fixes

- Split read, send, and archive/indexing workloads when appropriate.
- Use bounded retries with jitter and clear stop conditions.
- Add provider failover only after defining consistency rules.
- Cache static data and avoid repeated expensive `getProgramAccounts` calls.
- Log endpoint label and commitment with every failed request.

## Bad Advice To Avoid

- Do not blindly rotate RPC providers without proving the failure mode.
- Do not send every request to every endpoint unless the cost and rate limits are understood.
- Do not compare `processed` on one endpoint with `confirmed` or `finalized` on another and call it drift.

## Output

Return a table with endpoint, slot, block height, latency, error rate, observed limits, and recommendation.
