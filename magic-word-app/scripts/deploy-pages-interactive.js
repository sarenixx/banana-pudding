const readline = require("node:readline/promises");
const { stdin, stdout, exit } = require("node:process");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const allowedBranches = new Set(["main", "preview"]);
const projectMemoryPath = path.resolve(__dirname, "..", ".cf-pages-project");

function readLastProjectName() {
  if (!fs.existsSync(projectMemoryPath)) {
    return "";
  }

  return fs.readFileSync(projectMemoryPath, "utf8").trim();
}

function saveLastProjectName(projectName) {
  fs.writeFileSync(projectMemoryPath, `${projectName}\n`, "utf8");
}

async function run() {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const lastProjectName = readLastProjectName();
    const prompt = lastProjectName
      ? `Cloudflare Pages project name [${lastProjectName}]: `
      : "Cloudflare Pages project name: ";

    const projectNameInput = await rl.question(prompt);
    const projectName = projectNameInput.trim() || lastProjectName;

    if (!projectName) {
      console.error("Project name is required.");
      exit(1);
    }

    saveLastProjectName(projectName);

    const branchInput = await rl.question("Deploy branch (main/preview) [preview]: ");
    const branch = (branchInput.trim() || "preview").toLowerCase();

    if (!allowedBranches.has(branch)) {
      console.error("Branch must be either 'main' or 'preview'.");
      exit(1);
    }

    if (branch === "main") {
      const confirmInput = await rl.question("Deploying to production. Continue? (y/N): ");
      const confirm = confirmInput.trim().toLowerCase();
      if (confirm !== "y" && confirm !== "yes") {
        console.log("Cancelled.");
        exit(0);
      }
    }

    console.log(`\nDeploying dist to project '${projectName}' on branch '${branch}'...\n`);

    const result = spawnSync(
      "npx",
      ["wrangler", "pages", "deploy", "dist", "--project-name", projectName, "--branch", branch],
      { stdio: "inherit", shell: false }
    );

    if (typeof result.status === "number") {
      exit(result.status);
    }

    console.error("Deploy command did not return an exit status.");
    exit(1);
  } finally {
    rl.close();
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  exit(1);
});
