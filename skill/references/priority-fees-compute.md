# Priority Fees And Compute Units

Use this file when transactions fail under load, consume too many compute units, land slowly, or rely on hardcoded compute budget values.

## Evidence To Collect

- Simulation `unitsConsumed`
- Current compute unit limit
- Current compute unit price
- Recent prioritization fee data for relevant writable accounts when available
- Transaction size and number of instructions
- Whether address lookup tables are used
- Failure logs for `ComputationalBudgetExceeded` or account contention

## Procedure

1. Simulate with logs and record `unitsConsumed`.
2. Set compute limit with headroom based on observed usage, not a magic maximum.
3. Estimate priority fee from current network/provider data and business urgency.
4. Verify that account contention, not only fee level, is considered.
5. Re-test with the same instruction set and accounts.

## Good Defaults

- Add compute budget instructions before the main program instructions.
- Keep a ceiling on fee spend for consumer flows.
- Use higher priority for time-sensitive backend actions than background indexing or retries.
- Log fee paid, CU limit, CU consumed, and landing latency.

## Bad Advice To Avoid

- Do not always set the maximum CU limit.
- Do not raise priority fees without checking blockhash age, RPC health, and account contention.
- Do not treat devnet or localnet behavior as a mainnet fee model.

## Output

Return the observed CU use, proposed CU limit, proposed CU price, fee ceiling, and a verification plan.
