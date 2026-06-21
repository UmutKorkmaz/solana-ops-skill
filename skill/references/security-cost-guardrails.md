# Security And Cost Guardrails

Use this file when the agent proposes automation that touches wallets, RPC keys, paid APIs, transaction sending, retries, or provider failover.

## Hard Rules

- Never request or print private keys, seed phrases, or raw signing secrets.
- Never add hidden executables or background daemons.
- Never create unbounded retry loops for paid RPC calls or transaction sends.
- Never bypass preflight by default for user funds.
- Never raise priority fees without a fee ceiling and business justification.
- Never treat a single provider dashboard as the only source of truth.

## Cost Controls

- Limit fanout across RPC providers.
- Rate-limit expensive methods.
- Cache stable reads.
- Separate background jobs from user-facing traffic.
- Track priority fee spend by flow.

## Output

Return the safety risk, cost risk, required limit, and verification signal for any proposed automated change.
