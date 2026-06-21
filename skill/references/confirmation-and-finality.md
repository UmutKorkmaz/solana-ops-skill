# Confirmation And Finality

Use this file when a Solana app reports success too early, waits forever, disagrees with explorers, or confuses `processed`, `confirmed`, and `finalized`.

## Evidence To Collect

- Commitment used for reads, writes, simulation, and confirmation
- Confirmation method and timeout
- Latest blockhash and last valid block height
- `getSignatureStatuses` output
- UI state transition that marked the transaction as successful or failed
- Whether confirmation happens against the same endpoint used for `sendTransaction`

## Procedure

1. Identify the business requirement: fast UX, irreversible accounting, or settlement.
2. Match commitment to the requirement.
3. Confirm by signature status and block height expiry.
4. Avoid infinite polling after last valid block height is exceeded.
5. Reconcile UI success states with backend settlement states.

## Fix Patterns

- Use clear states: `submitted`, `seen`, `confirmed`, `finalized`, `expired`, `failed`.
- Store the signature and endpoint label before showing user progress.
- Handle expired blockhash as rebuild-and-resign, not resend-same-bytes.
- Use backend reconciliation for high-value payments.

## Output

Return a state machine recommendation and the exact condition that marks each state.
