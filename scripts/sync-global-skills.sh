#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
sync-global-skills.sh

Sync this repo's .cursor/skills into global Agent Skills directories.

Usage:
  scripts/sync-global-skills.sh [--copy] [--source PATH] [--targets "A,B,C"] [--dry-run]

Options:
  --copy         Copy files instead of symlinking (default: symlink).
  --source PATH  Source skills directory (default: repo/skills).
  --targets CSV  Comma-separated target directories.
                 Default: ~/.cursor/skills,~/.claude/skills,~/.codex/skills
  --dry-run      Print actions without making changes.
EOF
}

mode="symlink"
source_dir=""
targets_csv=""
dry_run="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --copy)
      mode="copy"
      shift
      ;;
    --source)
      source_dir="${2:-}"
      shift 2
      ;;
    --targets)
      targets_csv="${2:-}"
      shift 2
      ;;
    --dry-run)
      dry_run="true"
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
if [[ -z "$source_dir" ]]; then
  source_dir="${repo_root}/.cursor/skills"
fi

if [[ ! -d "$source_dir" ]]; then
  echo "Source directory not found: $source_dir" >&2
  exit 1
fi

if [[ -z "$targets_csv" ]]; then
  targets_csv="$HOME/.cursor/skills,$HOME/.claude/skills,$HOME/.codex/skills"
fi

IFS=',' read -r -a targets <<< "$targets_csv"

list_skills() {
  find "$source_dir" -mindepth 1 -maxdepth 1 -type d -print0
}

cleanup_legacy_symlink() {
  local target="$1"
  local legacy="$target/skills"
  if [[ -L "$legacy" ]]; then
    local resolved
    resolved="$(readlink "$legacy" || true)"
    if [[ "$resolved" == "$source_dir" ]]; then
      if [[ "$dry_run" == "true" ]]; then
        echo "rm -f \"$legacy\""
      else
        rm -f "$legacy"
      fi
    fi
  fi
}

sync_symlink() {
  local target="$1"
  if [[ -L "$target" ]]; then
    if [[ "$dry_run" == "true" ]]; then
      echo "rm -f \"$target\""
    else
      rm -f "$target"
    fi
  fi
  if [[ "$dry_run" == "true" ]]; then
    echo "mkdir -p \"$target\""
  else
    mkdir -p "$target"
  fi

  cleanup_legacy_symlink "$target"

  while IFS= read -r -d '' skill_dir; do
    local skill_name
    skill_name="$(basename "$skill_dir")"
    if [[ "$dry_run" == "true" ]]; then
      echo "ln -sfn \"$skill_dir\" \"$target/$skill_name\""
    else
      ln -sfn "$skill_dir" "$target/$skill_name"
    fi
  done < <(list_skills)

  if [[ -f "$target/README.md" ]]; then
    if [[ "$dry_run" == "true" ]]; then
      echo "rm -f \"$target/README.md\""
    else
      rm -f "$target/README.md"
    fi
  fi
}

sync_copy() {
  local target="$1"
  if [[ -L "$target" ]]; then
    if [[ "$dry_run" == "true" ]]; then
      echo "rm -f \"$target\""
    else
      rm -f "$target"
    fi
  fi
  if [[ "$dry_run" == "true" ]]; then
    echo "mkdir -p \"$target\""
  else
    mkdir -p "$target"
  fi

  cleanup_legacy_symlink "$target"

  while IFS= read -r -d '' skill_dir; do
    local skill_name
    skill_name="$(basename "$skill_dir")"
    if [[ "$dry_run" == "true" ]]; then
      echo "rsync -a --delete \"$skill_dir/\" \"$target/$skill_name/\""
    else
      mkdir -p "$target/$skill_name"
      rsync -a --delete "$skill_dir/" "$target/$skill_name/"
    fi
  done < <(list_skills)

  if [[ -f "$target/README.md" ]]; then
    if [[ "$dry_run" == "true" ]]; then
      echo "rm -f \"$target/README.md\""
    else
      rm -f "$target/README.md"
    fi
  fi
}

for target in "${targets[@]}"; do
  if [[ -z "$target" ]]; then
    continue
  fi
  if [[ "$mode" == "copy" ]]; then
    sync_copy "$target"
  else
    sync_symlink "$target"
  fi
done

echo "Done. Mode: $mode"