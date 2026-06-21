---
name: solana-ops
description: Production reliability and incident-response guidance for Solana builders. Use for RPC health, slot lag, transaction landing failures, priority fee and compute-unit tuning, confirmation bugs, websocket/indexer drift, provider failover, observability SLOs, and production readiness.
user-invocable: true
---

# Solana Ops Skill

Use this skill when the user asks about production reliability, operational debugging, launch readiness, or incidents in Solana apps, protocols, wallets, bots, indexers, payment systems, and backend services.

Do not use this skill as the primary source for writing Anchor or Pinocchio programs, token standards, wallet UI, or DeFi protocol integration. For those tasks, delegate to a core Solana development skill and return here only for production operations, reliability, and incident handling.

## Operating Procedure

1. Classify the failure mode before recommending fixes.
2. Collect evidence: signatures, logs, RPC endpoint behavior, current slot, block height, blockhash age, simulation output, confirmation path, compute units, priority fee, websocket state, indexer lag, and deployment timeline.
3. Separate client, wallet, RPC, validator/network, provider, program, and indexer causes.
4. Give a minimal fix, a verification command/check, and one rollback path.
5. If evidence is missing, state exactly what to collect next instead of guessing.

## Progressive Loading

Load only the focused file needed for the task:

| User problem | Load |
| --- | --- |
| RPC errors, unhealthy endpoint, slot lag, high latency | [references/rpc-health.md](references/rpc-health.md) |
| Transactions not landing, dropped txs, expired blockhash | [references/transaction-landing.md](references/transaction-landing.md) |
| Priority fees, compute units, CU limit, CU price | [references/priority-fees-compute.md](references/priority-fees-compute.md) |
| Confirmation timeout, finalized vs confirmed confusion | [references/confirmation-and-finality.md](references/confirmation-and-finality.md) |
| Websocket disconnects, missed events, indexer drift | [references/websocket-and-indexers.md](references/websocket-and-indexers.md) |
| Active incident, degraded production, postmortem | [references/incident-runbooks.md](references/incident-runbooks.md) |
| Metrics, alerts, SLOs, launch readiness | [references/observability-slos.md](references/observability-slos.md) |
| Provider selection, failover, multi-RPC strategy | [references/provider-comparison.md](references/provider-comparison.md) |
| Cost guardrails, key safety, unsafe automation | [references/security-cost-guardrails.md](references/security-cost-guardrails.md) |

## Expected Output Shape

For diagnosis tasks, respond with:

- `Finding`: the most likely failure mode and confidence
- `Evidence`: observed facts, including signatures, slots, errors, timestamps, and endpoints
- `Fix`: the smallest practical change
- `Verification`: command, log query, explorer check, or runtime probe to prove the fix
- `Rollback`: how to return to the previous state
- `Open questions`: only the facts still needed

## Commands

When available, use:

- [../commands/diagnose-rpc.md](../commands/diagnose-rpc.md) for endpoint health comparisons
- [../commands/inspect-failed-transactions.md](../commands/inspect-failed-transactions.md) for failed or missing signatures
- [../commands/production-readiness-check.md](../commands/production-readiness-check.md) for launch reviews

## Agent

For large investigations, use [../agents/solana-reliability-engineer.md](../agents/solana-reliability-engineer.md). The agent should inspect evidence, build a timeline, and return remediation steps with verification criteria.
