#!/usr/bin/env node
const path = require("path");
const yargs = require("yargs")
const simulator = require('./simulator/simulator.js');



const projectRoot = path.resolve(__dirname, ".");
console.log(`Running simulator with root directory of '${projectRoot}'`)


const cmd = yargs
    .command(['serve','*'], 'serve the simulator', (yargs) => {
        yargs.options({
            "layout": {
              default: "layouts/example.json",
              type: "string"
            }
        })
    }, (argv) => {
        console.log('Layout: '+argv.layout);
        simulator(projectRoot, argv.layout);
    })
    .help()
    .argv;