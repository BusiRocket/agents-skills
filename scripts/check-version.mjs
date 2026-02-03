#!/usr/bin/env node
/**
 * Ensures package.json version matches metadata.version in each skill's
 * SKILL.md frontmatter. Exits 1 if any skill has a different version.
 */

import { existsSync, readdirSync, readFileSync } from "fs";
import { createRequire } from "module";
import { join } from "path";

const require = createRequire(import.meta.url);
const ROOT = process.cwd();
const SKILLS_DIR = join(ROOT, "skills");
const PACKAGE_JSON = join(ROOT, "package.json");

function getSkillDirs() {
  if (!existsSync(SKILLS_DIR)) return [];
  return readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => join(SKILLS_DIR, d.name));
}

function getMetadataVersion(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const yaml = match[1];
  const metadataBlock = yaml.match(/^metadata:\s*([\s\S]+?)(?=\n[A-Za-z_-]+:|\n---|$)/im);
  if (!metadataBlock) return null;
  const versionMatch = metadataBlock[1].match(/version:\s*["']?([^"'\s]+)["']?/);
  return versionMatch ? versionMatch[1].trim() : null;
}

const pkg = require(PACKAGE_JSON);
const expected = pkg.version;
if (!expected) {
  console.error("package.json has no version");
  process.exit(1);
}

const skillDirs = getSkillDirs();
const mismatches = [];

for (const skillPath of skillDirs) {
  const skillMd = join(skillPath, "SKILL.md");
  if (!existsSync(skillMd)) continue;
  const content = readFileSync(skillMd, "utf-8");
  const skillVersion = getMetadataVersion(content);
  const name = skillPath.split(/[/\\]/).pop();
  if (skillVersion === null) continue;
  if (skillVersion !== expected) {
    mismatches.push({ name, expected, actual: skillVersion });
  }
}

if (mismatches.length > 0) {
  console.error("Version mismatch: package.json version must match metadata.version in each skill.");
  console.error(`package.json version: ${expected}`);
  for (const { name, actual } of mismatches) {
    console.error(`  ${name}: metadata.version = ${actual}`);
  }
  process.exit(1);
}

console.log(`Version check OK: ${expected} (${skillDirs.length} skills).`);
