const path = require("path");
const spawn = require("child_process").spawn;

const projectRoot = path.resolve(__dirname, ".");

function runSimulator(projectRoot, config) {

    // run the node server
    // https://stackoverflow.com/questions/10232192/exec-display-stdout-live
    const args = config.ground ? ["simulator/server/server.js", "--layout", config.layout, "--ground"] : ["simulator/server/server.js", "--layout", config.layout]
    const server = spawn("node",
      //TODO: - would prefer this to use <simulator> as the root dir and just work
      args,
      { cwd: `${projectRoot}` }
    );

    server.stdout.pipe(process.stdout);

    server.stderr.pipe(process.stderr);

    server.on("exit", (code) => {
      const codeMsg = (code) ? `with code ${code.toString()}` : "";
      console.log(` Simulator server stopped ${codeMsg}`);
    });
};

module.exports=runSimulator;