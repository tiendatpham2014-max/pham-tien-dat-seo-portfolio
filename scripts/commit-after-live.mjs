import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const expectedRepository = "tiendatpham2014-max/pham-tien-dat-seo-portfolio";
const sourcePaths = [
  ".gitignore",
  ".openai/hosting.json",
  "AGENTS.md",
  "CODEX_START_PROMPT.md",
  "README.md",
  "README_HUONG_DAN.md",
  "docs",
  "next-env.d.ts",
  "next.config.ts",
  "package-lock.json",
  "package.json",
  "public",
  "scripts",
  "src",
  "tsconfig.json",
];

function git(args, { allowFailure = false } = {}) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8" });
  if (result.error) throw result.error;
  if (result.status !== 0 && !allowFailure) {
    throw new Error(result.stderr.trim() || `git ${args[0]} failed`);
  }
  return result;
}

function option(name) {
  const index = process.argv.indexOf(name);
  return index < 0 ? undefined : process.argv[index + 1];
}

const version = option("--version");
const deploymentId = option("--deployment-id");
const url = option("--url");
const message = option("--message");

if (!/^\d+$/.test(version ?? "") || !/^appgdep_[a-z0-9]+$/.test(deploymentId ?? "") ||
    url !== "https://pham-tien-dat-seo.bloomybowl64.chatgpt.site" || !message?.trim()) {
  throw new Error("Usage: npm run commit:after-live -- --version N --deployment-id appgdep_... --url https://pham-tien-dat-seo.bloomybowl64.chatgpt.site --message \"Short change summary\"");
}

const remote = git(["remote", "get-url", "origin"]).stdout.trim();
if (!remote.includes(expectedRepository)) {
  throw new Error(`This checkout is not the GitHub portfolio repository: ${remote}`);
}

const branch = git(["branch", "--show-current"]).stdout.trim();
if (branch !== "main") {
  throw new Error(`Switch this GitHub Desktop checkout to main before committing (current: ${branch || "detached HEAD"}).`);
}

if (git(["diff", "--cached", "--name-only"]).stdout.trim()) {
  throw new Error("Review or clear the existing staged changes before running this command.");
}

git(["add", "-A", "--", ...sourcePaths]);
const diff = git(["diff", "--cached", "--quiet"], { allowFailure: true });
if (diff.status === 0) {
  console.log("No source changes to commit. Nothing was pushed.");
  process.exit(0);
}
if (diff.status !== 1) throw new Error(diff.stderr.trim() || "Could not inspect staged changes.");

git(["diff", "--cached", "--check"]);
const title = `Live v${version}: ${message.trim()}`;
const body = `Site deployment: ${deploymentId}\nLive URL: ${url}\n\nCommitted locally for review in GitHub Desktop. Upload manually with Push origin.`;
git(["commit", "-m", title, "-m", body]);
console.log(git(["log", "-1", "--format=%h %s"]).stdout.trim());
console.log("Local commit created. Nothing was pushed to GitHub.");
