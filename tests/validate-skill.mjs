#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, normalize, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const requiredFiles = [
  "README.md",
  "LICENSE",
  "install.sh",
  "skill/SKILL.md",
  "skill/references/rpc-health.md",
  "skill/references/transaction-landing.md",
  "skill/references/priority-fees-compute.md",
  "skill/references/confirmation-and-finality.md",
  "skill/references/websocket-and-indexers.md",
  "skill/references/incident-runbooks.md",
  "skill/references/observability-slos.md",
  "skill/references/provider-comparison.md",
  "skill/references/security-cost-guardrails.md",
  "commands/diagnose-rpc.md",
  "commands/inspect-failed-transactions.md",
  "commands/production-readiness-check.md",
  "agents/solana-reliability-engineer.md",
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

function listMarkdownFiles(dir) {
  const output = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory() && !entry.startsWith(".git")) {
      output.push(...listMarkdownFiles(path));
    } else if (stat.isFile() && path.endsWith(".md")) {
      output.push(path);
    }
  }
  return output;
}

const markdownFiles = listMarkdownFiles(root);
const localLinkPattern = /\[[^\]]+\]\(([^)]+\.md)\)/g;

for (const filePath of markdownFiles) {
  const rel = normalize(filePath.slice(root.length + 1));
  const content = readFileSync(filePath, "utf8");
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  if (rel.startsWith("skill/") && words > 1200) {
    failures.push(`Skill file too large for progressive loading: ${rel} (${words} words)`);
  }

  for (const match of content.matchAll(localLinkPattern)) {
    const target = match[1].split("#")[0];
    const resolved = resolve(dirname(filePath), target);
    if (!resolved.startsWith(root)) {
      failures.push(`Link escapes repository in ${rel}: ${match[1]}`);
    } else if (!existsSync(resolved)) {
      failures.push(`Broken markdown link in ${rel}: ${match[1]}`);
    }
  }
}

const skillEntry = readFileSync(join(root, "skill/SKILL.md"), "utf8");
for (const required of ["name: solana-ops", "description:", "Progressive Loading", "Expected Output Shape"]) {
  if (!skillEntry.includes(required)) {
    failures.push(`skill/SKILL.md missing required text: ${required}`);
  }
}

if (failures.length > 0) {
  console.error("Validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Validation passed: ${markdownFiles.length} markdown files checked.`);
