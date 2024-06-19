const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 <file> [options]")
  .command("$0 <file>", "Remove a file", (yargs) => {
    yargs.positional("file", {
      describe: "File to be removed",
      type: "string",
    });
  })
  .option("r", {
    alias: "recursive",
    type: "boolean",
    description: "Removes directories recursively and forcefully",
  }).argv;

const rmFileOrDirectory = (filePath, recursive = false, force = false) => {
  if (!fs.existsSync(filePath)) {
    console.error("\x1b[31mError: File does not exist.\x1b[0m");
    return;
  }
  try {
    fs.rmSync(filePath, { recursive, force });
    console.log("\x1b[32mSuccessfully removed file.\x1b[0m");
  } catch (err) {
    console.error(`\x1b[31mError: ${err.message}\x1b[0m`);
  }
};

rmFileOrDirectory(path.resolve(argv.file), argv.recursive || false, argv.recursive || false);