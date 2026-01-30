#!/usr/bin/env node
/**
 * Creates a dedicated Python venv and installs skills-ref for validation.
 * Run once: yarn validate:install
 * Then: yarn validate (uses this venv automatically).
 */

import { join } from "path";
import { spawnSync } from "child_process";

const ROOT = process.cwd();
const VENV_DIR = join(ROOT, ".venv-validate");
const BIN = join(VENV_DIR, process.platform === "win32" ? "Scripts" : "bin");
const PYTHON = join(BIN, process.platform === "win32" ? "python.exe" : "python");

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: "inherit", encoding: "utf-8", ...opts });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
  return r;
}

const pythonCmd = process.platform === "win32" ? "python" : "python3";
console.log("Creating validation venv at .venv-validate ...");
run(pythonCmd, ["-m", "venv", VENV_DIR]);

console.log("Installing skills-ref ...");
run(PYTHON, ["-m", "pip", "install", "--quiet", "skills-ref"]);

console.log("Done. Run yarn validate to check all skills.");
