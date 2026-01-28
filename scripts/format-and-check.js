#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const checkOnly = args.includes('--check-only');
const skipFormat = args.includes('--skip-format');
const skipValidate = args.includes('--skip-validate');

if (args.includes('-h') || args.includes('--help')) {
  console.log(`format-and-check.js

Format Markdown and run basic repository checks.

Usage:
  node scripts/format-and-check.js [--check-only] [--skip-format] [--skip-validate]

Options:
  --check-only   Do not write files; only check formatting (prettier --check).
  --skip-format  Skip Markdown formatting.
  --skip-validate  Skip skill validation checks.`);
  process.exit(0);
}

const repoRoot = path.resolve(__dirname, '..');
const skillsDir = path.join(repoRoot, 'skills');

function formatMarkdown() {
  if (!fs.existsSync(skillsDir)) {
    console.error(`Skills directory not found: ${skillsDir}`);
    process.exit(1);
  }

  try {
    if (checkOnly) {
      console.log('Checking formatting...');
      execSync('npx prettier --check "**/*.md"', {
        stdio: 'inherit',
        cwd: repoRoot,
      });
    } else {
      console.log('Formatting Markdown files...');
      execSync('npx prettier --write "**/*.md"', {
        stdio: 'inherit',
        cwd: repoRoot,
      });
    }
  } catch (error) {
    if (error.status !== 0) {
      process.exit(error.status || 1);
    }
  }
}

function validateSkills() {
  if (!fs.existsSync(skillsDir)) {
    console.error(`Missing skills directory: ${skillsDir}`);
    process.exit(1);
  }

  console.log('Validating skills...');
  let failed = false;
  const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const skillName of skillDirs) {
    const skillDir = path.join(skillsDir, skillName);
    const skillFile = path.join(skillDir, 'SKILL.md');

    if (!fs.existsSync(skillFile)) {
      console.error(`Missing SKILL.md: ${skillFile}`);
      failed = true;
      continue;
    }

    const content = fs.readFileSync(skillFile, 'utf-8');

    // Check for YAML frontmatter fence
    if (!content.startsWith('---\n')) {
      console.error(`Missing YAML frontmatter fence in: ${skillFile}`);
      failed = true;
      continue;
    }

    // Extract name from frontmatter
    const nameMatch = content.match(/^name:\s*(.+)$/m);
    if (!nameMatch) {
      console.error(`Missing frontmatter name in: ${skillFile}`);
      failed = true;
      continue;
    }

    const nameLine = nameMatch[1].trim();
    if (nameLine !== skillName) {
      console.error(
        `Frontmatter name mismatch: ${skillFile} (expected '${skillName}', got '${nameLine}')`
      );
      failed = true;
    }
  }

  if (failed) {
    process.exit(1);
  }
}

if (!skipFormat) {
  formatMarkdown();
}

if (!skipValidate) {
  validateSkills();
}

console.log('Done.');
