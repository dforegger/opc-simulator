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
              default: "examples/layout.json",
              type: "string"
            }
        })
    }, (argv) => {
        console.log('Layout: '+argv.layout);
        simulator(projectRoot, argv.layout);
    })
    .help()
    .argv;
/*
const layoutParser = yargs.options({
    "layout": {
      default: undefined,
      type: "string"
    }
}).argv;


const layout = layoutParser.layout || "not specified";

console.log(`Layout: '${layout}'`);

simulator(projectRoot, layout);*/