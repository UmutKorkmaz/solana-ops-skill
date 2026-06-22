# Priority Fees And Compute Units

Use this file when transactions fail under load, consume too many compute units, land slowly, or rely on hardcoded compute budget values.

## Source Anchors

- Solana fees: https://solana.com/docs/core/fees
- Solana transactions: https://solana.com/docs/core/transactions
- Solana RPC methods: https://solana.com/docs/rpc

Solana priority fee is based on compute unit price and compute unit limit. The fee is not based only on actual units consumed, so oversized CU limits can waste money.

## Evidence To Collect

- Simulation `unitsConsumed`
- Current compute unit limit
- Current compute unit price
- Recent prioritization fee data for relevant writable accounts when available
- Transaction size and number of instructions
- Whether address lookup tables are used
- Failure logs for `ComputationalBudgetExceeded` or account contention
- Whether the transaction fails only during congestion or also during normal conditions
- Fee paid, landing latency, and business urgency for the flow

## Known Limits And Formula

- Base fee is 5,000 lamports per signature.
- Prioritization fee is `ceil(compute_unit_price * compute_unit_limit / 1,000,000)` lamports.
- Default CU limit is 200,000 per non-budget instruction.
- Max CU limit per transaction is 1,400,000.
- Recent blockhash transactions are valid for a finite slot window, so fee tuning cannot fix already-expired signed bytes.

## Procedure

1. Simulate with logs and record `unitsConsumed`.
2. Confirm the failure is not blockhash expiry, RPC send failure, or confirmation drift.
3. Set compute limit with headroom based on observed usage, not a magic maximum.
4. Estimate priority fee from current network/provider data and business urgency.
5. Verify that account contention, not only fee level, is considered.
6. Re-test with the same instruction set and accounts.

## Decision Matrix

| Evidence | Likely issue | Action |
| --- | --- | --- |
| `ComputationalBudgetExceeded` | CU limit too low | Raise limit from simulated usage plus headroom |
| Slow landing, no expiry, congested accounts | Priority too low | Increase CU price within flow budget |
| High fee, low CU consumed | CU limit too high | Lower limit and re-test |
| Works off-peak, fails peak | Congestion or contention | Add dynamic fee policy and account-aware monitoring |
| Fails before reaching cluster | RPC or blockhash issue | Diagnose transaction landing first |

## Fee Policy Shape

Prefer an explicit policy per product flow:

| Flow | Urgency | Max fee | CU headroom | Retry rule |
| --- | --- | --- | --- | --- |
| Checkout | High | Product-defined ceiling | Simulated CU plus bounded margin | Rebuild on expiry |
| Admin maintenance | Medium | Lower ceiling | Measured by instruction | Backoff and retry |
| Indexing/backfill | Low | Minimal | N/A or low | Pause during congestion |

## Good Defaults

- Add compute budget instructions before the main program instructions.
- Keep a ceiling on fee spend for consumer flows.
- Use higher priority for time-sensitive backend actions than background indexing or retries.
- Log fee paid, CU limit, CU consumed, and landing latency.
- Tune by transaction family, not one global constant for the whole app.

## Bad Advice To Avoid

- Do not always set the maximum CU limit.
- Do not raise priority fees without checking blockhash age, RPC health, and account contention.
- Do not treat devnet or localnet behavior as a mainnet fee model.
- Do not copy fee constants from unrelated protocols without measuring your accounts and instruction set.
- Do not let an agent create unbounded fee escalation.

## Output

Return:

- Observed CU use and current CU limit
- Proposed CU limit and CU price
- Estimated max priority fee in lamports
- Flow-specific fee ceiling
- Verification plan with landing latency and cost metrics
