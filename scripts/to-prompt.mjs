#!/usr/bin/env node
/**
 * Generates <available_skills> XML for all skills under skills/ using the
 * Agent Skills reference library. Output is written to stdout for piping or
 * redirection. Prefers the local venv from yarn validate:install, then pipx,
 * then skills-ref on PATH.
 * See https://agentskills.io/integrate-skills
 */

import { spawnSync } from "child_process";
import { existsSync, readdirSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const SKILLS_DIR = join(ROOT, "skills");
const VENV_DIR = join(ROOT, ".venv-validate");
const VENV_BIN = join(VENV_DIR, process.platform === "win32" ? "Scripts" : "bin");
const VENV_CLI = join(VENV_BIN, process.platform === "win32" ? "agentskills.exe" : "agentskills");

const INSTALL_HINT = `
To run to-prompt, create the project venv (recommended):

  yarn validate:install

Then run:

  yarn to-prompt

Alternatively install globally: pip install skills-ref
Or use pipx: pipx run skills-ref to-prompt path/to/skill ...

See https://github.com/agentskills/agentskills/tree/main/skills-ref
`;

function getSkillDirs() {
  if (!existsSync(SKILLS_DIR)) {
    console.error("skills/ directory not found");
    process.exit(1);
  }
  return readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => join(SKILLS_DIR, d.name));
}

function detectExecutor(firstSkillPath) {
  if (existsSync(VENV_CLI)) {
    const r = spawnSync(VENV_CLI, ["to-prompt", firstSkillPath], {
      stdio: "pipe",
      encoding: "utf-8",
    });
    if (r.status === 0) return "venv";
  }
  const pipx = spawnSync("pipx", ["run", "skills-ref", "to-prompt", firstSkillPath], {
    stdio: "pipe",
    encoding: "utf-8",
    shell: true,
  });
  if (pipx.status === 0) return "pipx";
  const path = spawnSync("skills-ref", ["to-prompt", firstSkillPath], {
    stdio: "pipe",
    encoding: "utf-8",
    shell: true,
  });
  if (path.status === 0) return "path";
  return null;
}

function runToPrompt(skillPaths, method) {
  const args = ["to-prompt", ...skillPaths];
  if (method === "venv") {
    return spawnSync(VENV_CLI, args, {
      stdio: ["inherit", "inherit", "pipe"],
      encoding: "utf-8",
    });
  }
  if (method === "pipx") {
    return spawnSync("pipx", ["run", "skills-ref", "to-prompt", ...skillPaths], {
      stdio: ["inherit", "inherit", "pipe"],
      encoding: "utf-8",
      shell: true,
    });
  }
  return spawnSync("skills-ref", args, {
    stdio: ["inherit", "inherit", "pipe"],
    encoding: "utf-8",
    shell: true,
  });
}

const skillDirs = getSkillDirs();
if (skillDirs.length === 0) {
  console.error("No skill directories found under skills/");
  process.exit(1);
}

const method = detectExecutor(skillDirs[0]);
if (!method) {
  console.error("skills-ref to-prompt not found." + INSTALL_HINT);
  process.exit(1);
}

const result = runToPrompt(skillDirs, method);
if (result.status !== 0) {
  if (result.stderr) console.error(result.stderr.trim());
  process.exit(result.status ?? 1);
}
