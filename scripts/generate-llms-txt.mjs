#!/usr/bin/env node
/**
 * Generates llms.txt at repo root for skill discovery. Reads SKILL.md
 * frontmatter from each skill (Node-only, no Python). See
 * https://agentskills.io/specification and https://agentskills.io/llms.txt
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join, relative } from "path";

const ROOT = process.cwd();
const SKILLS_DIR = join(ROOT, "skills");
const LLMS_TXT = join(ROOT, "llms.txt");

function getSkillDirs() {
  if (!existsSync(SKILLS_DIR)) {
    console.error("skills/ directory not found");
    process.exit(1);
  }
  return readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => join(SKILLS_DIR, d.name));
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const yaml = match[1];
  const nameMatch = yaml.match(/^name:\s*(.+?)(?=\n|$)/m);
  const name = nameMatch ? nameMatch[1].trim() : null;
  const lines = yaml.split(/\r?\n/);
  let description = null;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("description:")) {
      const first = lines[i].replace(/^description:\s*/, "").trim();
      const rest = [];
      for (i++; i < lines.length; i++) {
        if (/^[a-z_-]+:/.test(lines[i]) || lines[i].trim() === "") break;
        rest.push(lines[i].trim());
      }
      i--;
      description = [first, ...rest].filter(Boolean).join(" ");
      break;
    }
  }
  return name && description ? { name, description } : null;
}

function buildLlmsTxt(skills) {
  const lines = [
    "# BusiRocket Agent Skills",
    "",
    "A collection of reusable Agent Skills for TypeScript/React/Next.js/Rust/Tauri projects. Skills follow the Agent Skills format (https://agentskills.io/specification).",
    "",
    "## Skills",
    "",
  ];
  for (const { name, description, skillPath } of skills) {
    const relativePath = relative(ROOT, skillPath).replace(/\\/g, "/");
    lines.push(`- ${name}: ${description}`);
    lines.push(`  ${relativePath}/SKILL.md`);
    lines.push("");
  }
  lines.push("## Links");
  lines.push("");
  lines.push("- [Agent Skills specification](https://agentskills.io/specification)");
  lines.push("- [Integrate skills into your agent](https://agentskills.io/integrate-skills)");
  lines.push("");
  return lines.join("\n");
}

const skillDirs = getSkillDirs();
if (skillDirs.length === 0) {
  console.error("No skill directories found under skills/");
  process.exit(1);
}

const skills = [];
for (const skillPath of skillDirs) {
  const skillMd = join(skillPath, "SKILL.md");
  if (!existsSync(skillMd)) continue;
  const content = readFileSync(skillMd, "utf-8");
  const meta = parseFrontmatter(content);
  if (meta) skills.push({ ...meta, skillPath });
}

skills.sort((a, b) => a.name.localeCompare(b.name));

writeFileSync(LLMS_TXT, buildLlmsTxt(skills), "utf-8");
console.log(`Wrote ${LLMS_TXT} (${skills.length} skills).`);
