# Example Incident Postmortem

## Summary

Checkout transactions were delayed or expired for 37 minutes because the backend queued signed transactions behind a slow worker and did not rebuild after blockhash expiry.

## Impact

18% of checkout attempts required user retry. No confirmed duplicate payments were found after reconciliation.

## Root Cause

Signed transactions were stored in a queue longer than their blockhash validity window.

## Corrective Actions

- Rebuild and re-sign expired transactions
- Add block height checks before send
- Add landing latency and expiry alerts
- Add reconciliation report for checkout signatures

## Verification

Staging load test confirmed no expired signed bytes are submitted after worker delay.
