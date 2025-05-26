import fs from "node:fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export async function covertUrl(baseUrl: string) {

    const pathJs = path.join(process.cwd(), "out", "script.js");
    const text = fs.readFileSync(pathJs).toString();
    const regex = /fetch\(["'](.*?)["']\)/g;

    let novoCodigo = text.replace(regex, (match, url) => {
        // Gere a nova URL como quiser:
        const makeUrl = `${baseUrl}${url}`;
        const novaUrl = `http://localhost:3001/proxy?url=${makeUrl}`;
        return `fetch("${novaUrl}")`;
    });

    fs.writeFileSync(pathJs, novoCodigo);
}

//covertUrl("http://localhost:3000");