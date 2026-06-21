# Solana Ops Skill

A production reliability skill for Solana builders that helps agents diagnose RPC issues, transaction landing failures, priority fee/CU problems, websocket/indexer drift, and incident readiness.

## What This Solves

Solana teams often debug production incidents with scattered RPC logs, explorer links, provider dashboards, blockhash errors, failed simulations, priority fee guesses, and indexer drift. This skill gives AI agents an evidence-first operating procedure for finding the real failure mode before recommending changes.

Use it for:

- RPC health checks, slot lag, provider failover, and quorum decisions
- Transaction landing failures, blockhash expiry, simulation mismatch, and confirmation bugs
- Compute unit and priority fee tuning without cargo-cult constants
- Websocket drops, missed account updates, and indexer drift
- Incident response, postmortems, production readiness, and Solana-specific SLOs

This is an addon-style skill. It complements core Solana development skills by focusing on production operations rather than program authoring.

## Installation

### Quick Install

```bash
npx skills add https://github.com/UmutKorkmaz/solana-ops-skill
```

### Manual Install

```bash
git clone https://github.com/UmutKorkmaz/solana-ops-skill
cd solana-ops-skill
./install.sh
```

The installer copies `skill/` into `~/.claude/skills/solana-ops` by default. Set `SKILLS_DIR` to install elsewhere:

```bash
SKILLS_DIR="$PWD/.claude/skills" ./install.sh
```

## Skill Structure

```text
skill/
  SKILL.md
  references/
    rpc-health.md
    transaction-landing.md
    priority-fees-compute.md
    confirmation-and-finality.md
    websocket-and-indexers.md
    incident-runbooks.md
    observability-slos.md
    provider-comparison.md
    security-cost-guardrails.md
commands/
  diagnose-rpc.md
  inspect-failed-transactions.md
  production-readiness-check.md
agents/
  solana-reliability-engineer.md
examples/
  rpc-health-report.md
  tx-failure-analysis.md
  incident-postmortem.md
tests/
  validate-skill.mjs
```

## Example Prompts

```text
My Solana payments are intermittently failing in production. Diagnose the likely tx landing issue.
```

```text
Compare these RPC endpoints and recommend a failover policy with evidence.
```

```text
Our websocket listener missed token account updates. Build an incident report and recovery plan.
```

```text
Review this dapp for Solana production readiness before launch.
```

## Validation

```bash
node tests/validate-skill.mjs
```

The validation checks that the entrypoint exists, local markdown links resolve, referenced files exist, and skill files stay within a reasonable token-loading size.

## Design Principles

- Evidence before advice: agents must collect logs, signatures, endpoint data, slots, block heights, simulation output, and provider behavior before recommending changes.
- Progressive loading: `skill/SKILL.md` routes to focused files instead of loading every ops guide at once.
- Production bias: recommendations should include monitoring, rollback, and verification, not just code changes.
- Safe defaults: no hidden executables, no credential collection, no hardcoded paid provider assumptions, and no private key handling.

## License

MIT
