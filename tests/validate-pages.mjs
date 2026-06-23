#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const docs = join(root, "docs");
const indexPath = join(docs, "index.html");
const failures = [];

for (const file of [
  "docs/index.html",
  "docs/styles.css",
  "docs/favicon.svg",
  "docs/assets/solana-ops-command-center.png",
  "docs/assets/solana-ops-diagnostic-flow.png",
]) {
  if (!existsSync(join(root, file))) {
    failures.push(`Missing page asset: ${file}`);
  }
}

if (existsSync(indexPath)) {
  const html = readFileSync(indexPath, "utf8");
  for (const required of [
    "Production reliability for live Solana agents.",
    "Solana Ops Skill helps agents diagnose",
    "https://github.com/UmutKorkmaz/solana-ops-skill",
    "https://github.com/solanabr/skill-bounty/pull/5",
    "./assets/solana-ops-command-center.png",
    "./assets/solana-ops-diagnostic-flow.png",
  ]) {
    if (!html.includes(required)) {
      failures.push(`docs/index.html missing required text: ${required}`);
    }
  }

  const localRefs = [...html.matchAll(/(?:href|src)="(\.\/[^"]+)"/g)].map((match) => match[1]);
  for (const ref of localRefs) {
    const file = resolve(dirname(indexPath), ref.split("#")[0]);
    if (!file.startsWith(docs)) {
      failures.push(`Local page reference escapes docs/: ${ref}`);
    } else if (!existsSync(file)) {
      failures.push(`Broken local page reference: ${ref}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Page validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Page validation passed.");
