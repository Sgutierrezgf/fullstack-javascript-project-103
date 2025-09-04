import { fileURLToPath } from "url";
import path from "path";
import { writeFileSync } from "fs";
import genDiff from "../src/genDiff.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, "..", "__fixtures__", filename);

// Archivos para generar expected.txt (flat)
const flatJSON1 = getFixturePath("file1.json");
const flatJSON2 = getFixturePath("file2.json");
const flatYML1 = getFixturePath("file1.yml");
const flatYML2 = getFixturePath("file2.yml");

// Generar expected.txt (para flat files)
const flatDiffJSON = genDiff(flatJSON1, flatJSON2);
writeFileSync(getFixturePath("expected.txt"), flatDiffJSON);
console.log("✅ expected.txt generado correctamente");

// Generar expected_nested.txt (para nested files)
const nestedDiffJSON = genDiff(flatJSON1, flatJSON2);
writeFileSync(getFixturePath("expected_nested.txt"), nestedDiffJSON);
console.log("✅ expected_nested.txt generado correctamente");
