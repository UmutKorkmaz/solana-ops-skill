# Launch Post Draft

## Short Post

I built Solana Ops Skill for the Superteam Solana AI Kit skill bounty.

It helps AI agents debug production Solana issues with evidence: RPC health, transaction landing, blockhash expiry, priority fee/CU tuning, confirmation, websocket/indexer drift, SLOs, provider failover, and incident runbooks.

Repo: https://github.com/UmutKorkmaz/solana-ops-skill
PR: https://github.com/solanabr/skill-bounty/pull/5

## Thread Draft

1/ I built Solana Ops Skill for the Superteam Solana AI Kit skill bounty.

It is a production reliability skill for Solana builders: RPC health, transaction landing, priority fee/CU tuning, websocket/indexer drift, and incident readiness.

https://github.com/UmutKorkmaz/solana-ops-skill

2/ The problem: once a Solana app is live, failures are rarely just "the transaction failed."

It might be blockhash expiry, stale RPC, provider rate limits, wallet approval delay, fee/CU policy, confirmation logic, websocket loss, or indexer drift.

3/ The skill gives agents a production-first operating procedure:

- collect signatures, slots, block heights, logs, fees, CU, endpoint labels
- classify the failure mode
- recommend the smallest fix
- include verification and rollback

4/ It is progressive and token-efficient.

`skill/SKILL.md` routes only to focused references:

- RPC health
- transaction landing
- priority fees and compute units
- confirmation/finality
- websocket/indexers
- incident runbooks
- observability/SLOs
- provider failover

5/ It includes:

- commands for RPC diagnosis and failed tx inspection
- a Solana reliability engineer agent profile
- example reports/postmortems
- installer script
- validation tests
- GitHub Actions CI
- MIT license

6/ Submitted here:

Repo: https://github.com/UmutKorkmaz/solana-ops-skill
Skill bounty PR: https://github.com/solanabr/skill-bounty/pull/5

Built to complement Solana dev skills by focusing on production operations after a dapp is live.
