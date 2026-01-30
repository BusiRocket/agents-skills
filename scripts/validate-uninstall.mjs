#!/usr/bin/env node
/**
 * Removes the validation venv created by yarn validate:install.
 */

import { existsSync, rmSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const VENV_DIR = join(ROOT, ".venv-validate");

if (!existsSync(VENV_DIR)) {
  console.log("No .venv-validate found. Nothing to remove.");
  process.exit(0);
}

rmSync(VENV_DIR, { recursive: true });
console.log("Removed .venv-validate");
