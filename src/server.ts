import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { init } from "./app";
import path from "node:path";
import fs from "node:fs";
import axios from "axios";

const port = parseInt(process.env.PORT as string) || 3002;
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("out"));

export async function startServer() {

    const arg = process.argv.slice(2);

    app.get("/proxy", async (req: Request, res: any) => {
        const url = req.query.url as string;
        const data = await axios.get(url);
        const responseData = data.data;
        return res.status(200).json(responseData);
    });

    app.post("/proxy", async (req: Request, res: any) => {
        const url = req.query.url as string;
        const data = await axios.post(url, req.body);
        const responseData = data.data;
        return res.status(200).json(responseData);
    });

    app.listen(port, async () => {
        if (arg[0] == "-l") {
            console.log("server is run");

            if (fs.existsSync(path.join(process.cwd(), "out", "index.html"))) {
                console.log("pagina encontrada, vá em: http://localhost:3001/index.html");
            }
        }
    });

    if (arg[0] !== "-l") {
        await init(port);
    }
    //await init();

}

startServer();