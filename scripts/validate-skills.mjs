#!/usr/bin/env node
/**
 * Validates all skills under skills/ using the Agent Skills reference library.
 * Prefers the local venv from yarn validate:install, then pipx, then skills-ref on PATH.
 * See https://agentskills.io/specification#validation
 */

import { readdirSync, existsSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

const ROOT = process.cwd();
const SKILLS_DIR = join(ROOT, "skills");
const VENV_DIR = join(ROOT, ".venv-validate");
const VENV_BIN = join(VENV_DIR, process.platform === "win32" ? "Scripts" : "bin");
// skills-ref package installs the CLI as "agentskills"
const VENV_VALIDATOR = join(VENV_BIN, process.platform === "win32" ? "agentskills.exe" : "agentskills");

const INSTALL_HINT = `
To run validation, create the project venv (recommended):

  yarn validate:install

Then run:

  yarn validate

Alternatively install globally: pip install skills-ref
Or use pipx: pipx run skills-ref validate path/to/skill

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

function detectValidator(firstSkillPath) {
  if (existsSync(VENV_VALIDATOR)) {
    const r = spawnSync(VENV_VALIDATOR, ["validate", firstSkillPath], {
      stdio: "pipe",
      encoding: "utf-8",
    });
    if (r.status === 0) return "venv";
  }
  const pipx = spawnSync("pipx", ["run", "skills-ref", "validate", firstSkillPath], {
    stdio: "pipe",
    encoding: "utf-8",
    shell: true,
  });
  if (pipx.status === 0) return "pipx";
  const path = spawnSync("skills-ref", ["validate", firstSkillPath], {
    stdio: "pipe",
    encoding: "utf-8",
    shell: true,
  });
  if (path.status === 0) return "path";
  return null;
}

function runValidate(skillPath, method) {
  if (method === "venv") {
    const r = spawnSync(VENV_VALIDATOR, ["validate", skillPath], {
      stdio: "pipe",
      encoding: "utf-8",
    });
    return { ok: r.status === 0, stderr: (r.stderr || "").trim() };
  }
  if (method === "pipx") {
    const r = spawnSync("pipx", ["run", "skills-ref", "validate", skillPath], {
      stdio: "pipe",
      encoding: "utf-8",
      shell: true,
    });
    return { ok: r.status === 0, stderr: (r.stderr || "").trim() };
  }
  const r = spawnSync("skills-ref", ["validate", skillPath], {
    stdio: "pipe",
    encoding: "utf-8",
    shell: true,
  });
  return { ok: r.status === 0, stderr: (r.stderr || "").trim() };
}

const skillDirs = getSkillDirs();
if (skillDirs.length === 0) {
  console.error("No skill directories found under skills/");
  process.exit(1);
}
const method = detectValidator(skillDirs[0]);

if (!method) {
  console.error("skills-ref validator not found." + INSTALL_HINT);
  process.exit(1);
}

let failed = 0;
for (const skillPath of skillDirs) {
  const skillName = skillPath.split(/[/\\]/).pop();
  const result = runValidate(skillPath, method);
  if (result.ok) {
    console.log(`✓ ${skillName}`);
  } else {
    console.error(`✗ ${skillName}`);
    if (result.stderr) console.error(result.stderr);
    failed++;
  }
}

if (failed > 0) {
  process.exit(1);
}
console.log(`\nValidated ${skillDirs.length} skill(s).`);
