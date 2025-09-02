import path from "path";

export default function parse(data, filepath) {
    const ext = path.extname(filepath);

    if (ext === ".json") {
        return JSON.parse(data);
    }

    throw new Error(`Unsupported file format: ${ext}`);
}
