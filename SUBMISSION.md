# Superteam Bounty Submission Packet

## Skill

Solana Ops Skill

## One-Line Pitch

A production reliability skill for Solana builders that helps agents diagnose RPC issues, transaction landing failures, priority fee/CU problems, websocket/indexer drift, and incident readiness.

## Submission Link

https://github.com/UmutKorkmaz/solana-ops-skill

## Skill Bounty PR

https://github.com/solanabr/skill-bounty/pull/5

## Did You Contribute Towards Existing Repos Or Is It A New Idea?

New idea. Solana Ops Skill focuses on production reliability and incident response for live Solana applications: RPC health, transaction landing, blockhash expiry, priority fee/CU tuning, confirmation, websocket/indexer drift, observability SLOs, provider failover, and cost/safety guardrails. It is submitted as a standalone MIT-licensed repo and as a PR to `solanabr/skill-bounty`.

## Closest Competing Skill

The closest adjacent skills are core Solana development skills, payment operations skills, and signing safety skills. Solana Ops Skill is different because it focuses on production operations after a dapp is live. It does not primarily teach program authoring, payment product design, or transaction decoding. It helps an agent diagnose live reliability failures with evidence: signatures, slots, block heights, RPC endpoint behavior, simulation logs, fee/CU data, websocket cursors, indexer lag, and incident timelines.

## Founder-Market Fit Proof

This skill targets recurring production problems that Solana founders and builders hit after launch:

- Users report payments or actions as failed even though a signature exists.
- Transactions simulate successfully but do not land.
- Blockhash expiry is misdiagnosed as a wallet, provider, or fee issue.
- RPC providers disagree on slot freshness, rate limits, or send behavior.
- Websocket listeners miss updates and indexers drift from chain state.
- Teams lack a first-15-minutes incident runbook for Solana-specific outages.

The repository includes proof of execution:

- Progressive `skill/SKILL.md` routing
- Focused operational references
- Commands for RPC diagnosis, failed transaction inspection, and readiness checks
- A reliability agent profile
- Example reports and postmortem outputs
- Installer script
- Validation tests
- GitHub Actions CI

## Validation Evidence

Standalone repo:

```bash
npm test
npm run lint:shell
```

Current validation:

- `npm test`: PASS
- `npm run lint:shell`: PASS
- GitHub Actions: PASS

CI workflow:

https://github.com/UmutKorkmaz/solana-ops-skill/actions/workflows/validate.yml

Rubric checklist:

https://github.com/UmutKorkmaz/solana-ops-skill/blob/main/RUBRIC_CHECKLIST.md

End-to-end demo:

https://github.com/UmutKorkmaz/solana-ops-skill/blob/main/DEMO.md

## Anything Else?

The skill is designed to be directly mergeable or submodule-ready:

- MIT licensed
- No hidden executables
- No private-key handling
- No postinstall behavior
- No provider lock-in
- Progressive and token-efficient loading
- Source-backed guidance using official Solana docs for RPC, transaction confirmation, transactions, fees, and websocket methods

Official Solana documentation anchors:

- https://solana.com/docs/rpc
- https://solana.com/developers/guides/advanced/confirmation
- https://solana.com/docs/core/transactions
- https://solana.com/docs/core/fees
- https://solana.com/docs/rpc/websocket
