#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$ROOT_DIR/skill"
SKILLS_DIR="${SKILLS_DIR:-$HOME/.claude/skills}"
TARGET_DIR="$SKILLS_DIR/solana-ops"

if [[ ! -f "$SOURCE_DIR/SKILL.md" ]]; then
  echo "Missing skill/SKILL.md; run this installer from the repository root." >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"
rm -rf "$TARGET_DIR"/*
cp -R "$SOURCE_DIR"/. "$TARGET_DIR"/

echo "Installed solana-ops skill to $TARGET_DIR"
echo "Run: node tests/validate-skill.mjs"
