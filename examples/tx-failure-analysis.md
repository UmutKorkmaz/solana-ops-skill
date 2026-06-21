# Example Transaction Failure Analysis

## Finding

The payment flow expires blockhashes during wallet approval and then resends the same signed transaction bytes.

## Evidence

- Transaction built at `12:00:02`
- User approved wallet at `12:02:31`
- Last valid block height was exceeded before first send
- Retry loop resent the same signature three times

## Fix

When block height exceeds `lastValidBlockHeight`, rebuild the transaction with a fresh blockhash and request a new signature. Stop retrying expired signed bytes.

## Verification

Add a test that forces wallet approval delay beyond blockhash validity and asserts the app rebuilds before sending.
