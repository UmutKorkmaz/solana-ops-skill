# Example RPC Health Report

## Finding

Primary RPC is suitable for reads but should be degraded for sends until `sendTransaction` error rate returns below the launch threshold.

## Evidence

| Endpoint | Slot gap | P95 latency | Error pattern | Recommendation |
| --- | ---: | ---: | --- | --- |
| primary | +0 slots | 180 ms | `sendTransaction` 503 burst | Degrade sends |
| backup-a | +1 slot | 240 ms | No send errors | Use for sends |
| backup-b | +8 slots | 420 ms | Stale reads | Do not fail over |

## Fix

Route transaction sends to `backup-a`, keep reads on `primary`, and keep `backup-b` out of failover until slot lag recovers.

## Verification

Check landing latency and `sendTransaction` error rate for 30 minutes after the routing change.
