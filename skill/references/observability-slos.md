# Observability And SLOs

Use this file when preparing a Solana app for launch, defining alerts, or reviewing production readiness.

## Core Signals

- Transaction landing latency by flow
- Signature failure rate by program and instruction
- Blockhash expiry count
- RPC error rate by endpoint and method
- Slot lag by endpoint
- Simulation failure rate
- Priority fee spend
- Compute units consumed
- Websocket reconnect count
- Indexer lag and reconciliation mismatches

## Suggested SLOs

- Payment transaction confirmed within product-defined latency target
- RPC read availability for critical methods
- Indexer lag under product-defined slot threshold
- Reconciliation completes within defined recovery window
- Failed transaction errors include actionable labels

## Alert Design

- Alert on user-impacting symptoms first.
- Page on sustained landing failure or accounting drift.
- Ticket on rising cost, latency, or retry pressure.
- Include endpoint labels, program IDs, instruction names, and deployment version in logs.

## Output

Return an SLO table with signal, target, measurement query, alert threshold, owner, and runbook link.
