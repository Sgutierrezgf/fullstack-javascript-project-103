import { readFileSync } from "fs";
import path from "path";
import genDiff from "../src/genDiff.js";
import parse from "../src/parser.js";

const getFixturePath = (filename) => path.join("__fixtures__", filename);

test("compare flat JSON files", () => {
    const file1 = readFileSync(getFixturePath("file1.json"), "utf-8");
    const file2 = readFileSync(getFixturePath("file2.json"), "utf-8");
    const expected = readFileSync(getFixturePath("expected.txt"), "utf-8");

    const data1 = parse(file1, getFixturePath("file1.json"));
    const data2 = parse(file2, getFixturePath("file2.json"));


    const normalize = (str) => str.replace(/\r\n/g, "\n").trim();

    expect(normalize(genDiff(data1, data2))).toEqual(normalize(expected));
});
