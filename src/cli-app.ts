import readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (text: string) => new Promise((resolve) => {
    rl.question(text, (res) => resolve(res));
});


export async function setConfig() {

    const url = await question("digite a url do site (ex:https://exemplo.com): ");
    const isJs = await question("permitir javascript? (s)(n)\n");
    let js: boolean = true;

    if (String(isJs).toLowerCase() == "n") {
        js = false;
    }

    rl.close();

    return { url, js }
}