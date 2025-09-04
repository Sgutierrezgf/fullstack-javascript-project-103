import { program } from "commander";
// import path from "path";
// import { readFileSync } from "fs";
// import parse from "../src/parser.js";
import genDiff from "../src/genDiff.js";


program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format <type>', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2, opts) => {
        const output = genDiff(filepath1, filepath2, opts.format);
        console.log(output);
    });

program.parse();