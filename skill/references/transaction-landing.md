# Transaction Landing

Use this file when transactions simulate successfully but do not land, signatures disappear, blockhashes expire, confirmation times out, or users see intermittent payment failures.

## Evidence To Collect

- Transaction signature and timestamp
- Serialized transaction creation time and send time
- Latest blockhash, last valid block height, and current block height during send
- Simulation result and logs
- Compute units consumed in simulation
- Priority fee and compute unit limit instructions
- RPC endpoint used for simulation, send, and confirmation
- Wallet signing delay and user approval time
- Retry count and whether the same signed transaction was resent

## Common Failure Modes

- Stale blockhash caused by slow user signing or queued backend sends
- Confirmation loop watches the wrong commitment or endpoint
- Simulation endpoint differs from send endpoint and sees different state
- Compute limit too low despite successful local assumptions
- Priority fee too low during congestion
- Program state changes between simulation and landing
- Wallet or backend resubmits expired signed bytes

## Recommended Procedure

1. Reconstruct the transaction lifecycle from build to final confirmation.
2. Confirm whether the signature reached the cluster.
3. Compare `getSignatureStatuses` from the send endpoint and one independent endpoint.
4. Check blockhash validity at send time.
5. Compare simulation logs with landed or failed on-chain logs.
6. Tune CU and priority fee from observed simulation and recent fee data.

## Fix Patterns

- Build and sign close to send time.
- Refresh blockhash before wallet signing if the flow can stall.
- Use explicit confirmation by block height, not open-ended polling.
- Add a clear expired-blockhash branch that rebuilds and re-signs.
- Use endpoint labels in transaction telemetry.

## Output

Return a lifecycle timeline: `built`, `signed`, `sent`, `first seen`, `confirmed/finalized`, `expired/failed`, plus the smallest code or configuration change.
