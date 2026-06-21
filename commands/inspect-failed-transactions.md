# Inspect Failed Transactions

Use this command when the user provides failed, missing, or slow Solana transaction signatures.

## Inputs

- Signature list
- App logs around build/sign/send/confirm
- RPC endpoint labels
- Program IDs and instruction names when known

## Procedure

1. Build a lifecycle timeline for each signature.
2. Check signature status and logs.
3. Validate blockhash age and confirmation method.
4. Compare simulation and on-chain behavior.
5. Identify whether the fix is client, RPC, fee/CU, program, or indexer related.

## Output

Finding, evidence, fix, verification, rollback, and open questions.
