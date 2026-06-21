# Diagnose RPC

Use this command when comparing Solana RPC endpoints for production health.

## Inputs

- Endpoint labels and URLs
- Commitment level
- Methods used by the app
- Relevant time window

## Procedure

1. Run health, slot, block height, latest blockhash, and version checks.
2. Measure repeated latency samples for critical methods.
3. Compare slot lag against an independent endpoint.
4. Check rate-limit or provider-specific errors.
5. Return a recommendation by traffic class.

## Output

Endpoint matrix plus `keep`, `degrade`, `fail over`, or `investigate` decision.
