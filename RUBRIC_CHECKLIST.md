# Bounty Rubric Checklist

This checklist maps the Superteam Solana AI Kit skill bounty requirements to concrete files in this repository.

## What Makes A Great Submission

| Requirement | Status | Evidence |
| --- | --- | --- |
| Solves a real, recurring builder problem | Covered | [README.md](README.md), [SUBMISSION.md](SUBMISSION.md), [DEMO.md](DEMO.md) describe recurring RPC, transaction landing, blockhash expiry, websocket/indexer, and incident-response failures. |
| Cross-domain usefulness | Covered | The skill spans dapps, wallets, bots, indexers, payment systems, backend services, infra, observability, and incident response. |
| Production-grade, not AI slop | Covered | [tests/validate-skill.mjs](tests/validate-skill.mjs), [package.json](package.json), [.github/workflows/validate.yml](.github/workflows/validate.yml), source anchors in reference files, bad-advice guardrails, and concrete output contracts. |
| Tested | Covered | `npm test` validates required files, markdown links, and progressive-loading file size. `npm run lint:shell` validates installer syntax. |
| Accurate and current to the Solana stack | Covered | Source anchors use official Solana docs for RPC, transaction confirmation, transactions, fees, and websocket methods. See [skill/references/rpc-health.md](skill/references/rpc-health.md), [skill/references/transaction-landing.md](skill/references/transaction-landing.md), and [skill/references/priority-fees-compute.md](skill/references/priority-fees-compute.md). |
| Progressive and token-efficient | Covered | [skill/SKILL.md](skill/SKILL.md) routes by failure mode and loads only focused references. The validator enforces a word ceiling for skill files. |
| Clear `SKILL.md` routing | Covered | [skill/SKILL.md](skill/SKILL.md) includes when to use the skill, when not to use it, routing, evidence expectations, output shape, commands, and agent handoff. |
| Good documentation | Covered | [README.md](README.md), [SUBMISSION.md](SUBMISSION.md), [FORM_ANSWERS.md](FORM_ANSWERS.md), [LAUNCH_POST.md](LAUNCH_POST.md), [RUBRIC_CHECKLIST.md](RUBRIC_CHECKLIST.md), and [DEMO.md](DEMO.md). |
| Working install path | Covered | [install.sh](install.sh), README quick/manual install instructions, and shell syntax validation. |
| MIT licensed | Covered | [LICENSE](LICENSE). |
| Ready to merge or submodule into the kit | Covered | Public standalone repo, open `solanabr/skill-bounty` PR, no hidden executables, no postinstall behavior, and all skill files under a predictable `solana-ops-skill/` directory in the PR. |
| Optional agents/commands/configs | Covered | [agents/solana-reliability-engineer.md](agents/solana-reliability-engineer.md), [commands/diagnose-rpc.md](commands/diagnose-rpc.md), [commands/inspect-failed-transactions.md](commands/inspect-failed-transactions.md), and [commands/production-readiness-check.md](commands/production-readiness-check.md). |

## Submission Requirements

| Requirement | Status | Evidence |
| --- | --- | --- |
| Public GitHub repo or PR link containing the skill | Covered | https://github.com/UmutKorkmaz/solana-ops-skill and https://github.com/solanabr/skill-bounty/pull/5 |
| README explaining what it does, problem solved, and install | Covered | [README.md](README.md) |
| Comprehensive `SKILL.md` entry point following kit structure | Covered | [skill/SKILL.md](skill/SKILL.md) |
| Submit PR link and questionnaire on the listing | Ready, manual step | [FORM_ANSWERS.md](FORM_ANSWERS.md) contains copy-paste answers. |
| Novel skill also submitted as PR to `solanabr/skill-bounty` | Covered | https://github.com/solanabr/skill-bounty/pull/5 |

## Judging Criteria

| Criterion | Status | Why |
| --- | --- | --- |
| Usefulness | Strong | Production incidents around RPC, transaction landing, fees/CU, confirmations, websocket/indexer drift, and SLOs are recurring Solana builder problems. |
| Novelty | Strong | The skill targets post-launch Solana operations, not program authoring, payment design, or signing-time transaction decoding. |
| Quality | Strong | It is documented, source-backed, tested, CI-backed, MIT licensed, and includes examples, commands, and an agent profile. |
| Fit | Strong | It uses a compact `skill/SKILL.md` router, focused reference files, commands, agents, examples, installer, and validation scripts. |

## Current Validation Commands

```bash
npm test
npm run lint:shell
```

Expected result:

```text
Validation passed: 23 markdown files checked.
```
