import yaml from "js-yaml";
import path from "path";
import fs from "fs";

const parse = (filepath) => {
    const ext = path.extname(filepath);
    const data = fs.readFileSync(filepath, "utf-8");

    switch (ext) {
        case ".json":
            return JSON.parse(data);
        case ".yml":
        case ".yaml":
            return yaml.load(data);
        default:
            throw new Error(`Formato no soportado: ${ext}`);
    }
};

export default parse;
