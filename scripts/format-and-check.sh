#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
format-and-check.sh

Format Markdown and run basic repository checks.

Usage:
  scripts/format-and-check.sh [--check-only] [--skip-format] [--skip-validate]

Options:
  --check-only   Do not write files; only check formatting (prettier --check).
  --skip-format  Skip Markdown formatting.
  --skip-validate  Skip skill validation checks.
EOF
}

check_only="false"
skip_format="false"
skip_validate="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --check-only)
      check_only="true"
      shift
      ;;
    --skip-format)
      skip_format="true"
      shift
      ;;
    --skip-validate)
      skip_validate="true"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
  esac
done

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
skills_dir="${repo_root}/.cursor/skills"

if [[ ! -d "$skills_dir" ]]; then
  echo "Skills directory not found: $skills_dir" >&2
  exit 1
fi

format_markdown() {
  local md_glob
  md_glob=(
    "$repo_root/**/*.md"
  )

  if ! command -v npx >/dev/null 2>&1; then
    echo "npx not found; skipping Markdown formatting." >&2
    return 0
  fi

  if [[ "$check_only" == "true" ]]; then
    npx prettier --check "**/*.md"
  else
    npx prettier --write "**/*.md"
  fi
}

validate_skills() {
  local failed="false"

  if [[ ! -d "$skills_dir" ]]; then
    echo "Missing skills directory: $skills_dir" >&2
    return 1
  fi

  while IFS= read -r -d '' skill; do
    local skill_name
    local skill_file
    skill_name="$(basename "$skill")"
    skill_file="$skill/SKILL.md"

    if [[ ! -f "$skill_file" ]]; then
      echo "Missing SKILL.md: $skill_file" >&2
      failed="true"
      continue
    fi

    if ! rg -q "^---$" "$skill_file"; then
      echo "Missing YAML frontmatter fence in: $skill_file" >&2
      failed="true"
      continue
    fi

    local name_line
    name_line="$(rg "^name:\\s*.+$" "$skill_file" | head -n 1 | sed 's/^name:\\s*//')"
    if [[ -z "$name_line" ]]; then
      echo "Missing frontmatter name in: $skill_file" >&2
      failed="true"
      continue
    fi
    if [[ "$name_line" != "$skill_name" ]]; then
      echo "Frontmatter name mismatch: $skill_file (expected '$skill_name', got '$name_line')" >&2
      failed="true"
    fi
  done < <(find "$skills_dir" -mindepth 1 -maxdepth 1 -type d -print0)

  if [[ "$failed" == "true" ]]; then
    return 1
  fi
}

if [[ "$skip_format" != "true" ]]; then
  format_markdown
fi

if [[ "$skip_validate" != "true" ]]; then
  validate_skills
fi

echo "Done."
