import axios from "axios"
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { setConfig } from "./cli-app";
import { covertUrl } from "./verif-js";
import { getSystem } from "./utils/get-system";


export async function init(port: number) {

    const executePath = getSystem();
    const config = await setConfig();

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: executePath,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    let allCSS = "";
    let allJs = "";
    let isError = false;

    await page.setRequestInterception(true);
    page.on("request", async (req) => {
        try {
            if (req.resourceType() === "stylesheet") {
                const res = await axios.get(req.url());
                const css = await res.data;
                allCSS += `\n/* CSS de ${req.url()} */\n ${css}`;
                //console.log(css);
            }
            if (req.resourceType() === "script") {
                const res = await axios.get(req.url());
                const js = await res.data;
                allJs += js;
            }
            req.continue();
        } catch (error) {
            console.log("erro ao processar site");
            isError = true;
            return;
        }
    });

    await page.goto((String(config.url)), { waitUntil: "networkidle2" })

    const html = await page.content();

    const outDir = path.join(process.cwd(), "out");

    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    //arquvios de saida  
    const filePathHTML = path.join(outDir, "index.html");
    const filePathCSS = path.join(outDir, "styles.css");
    const filePathJs = path.join(outDir, "script.js");

    let finalHTML = html.replace("</head>", `<link rel="stylesheet" href="styles.css"></head>`);
    if (config.js) {
        finalHTML = finalHTML.replace("</body>", `<script src="script.js"></script></body>`);
    }

    //salvando
    fs.writeFileSync(filePathHTML, finalHTML);
    fs.writeFileSync(filePathCSS, allCSS);
    fs.writeFileSync(filePathJs, allJs);
    //fs.writeFileSync(filePathHTML, html);


    if (!isError) {
        console.log("HTML, CSS e javaScript salvos");
        await browser.close();
        console.log(`vizualize eim: http://localhost:${port}/index.html`);
        covertUrl(config.url as string);
        return;
    }

    console.log("resultado final: error");

    await browser.close();
    return;
}