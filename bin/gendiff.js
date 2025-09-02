import { program } from "commander";
import path from "path";
import { readFileSync } from "fs";
import parse from "../src/parser.js";

program.description("Compares two configuration files and shows a difference.")
    .version("1.0.0")
    .option("-f, --format <type>", "output format")
    .arguments("<filepath1> <filepath2>").action((filepath1, filepath2) => {

        const absolutePath1 = path.resolve(process.cwd(), filepath1);
        const absolutePath2 = path.resolve(process.cwd(), filepath2);


        const file1 = readFileSync(absolutePath1, "utf-8");
        const file2 = readFileSync(absolutePath2, "utf-8");


        const data1 = parse(file1, absolutePath1);
        const data2 = parse(file2, absolutePath2);

        console.log("Archivo 1:", data1);
        console.log("Archivo 2:", data2);
    })
    .parse();



