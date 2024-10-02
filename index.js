import express from "express";
import dotenv from "dotenv";
import path from "path";
import router from "./src/routes/routing.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

// CREATE THE EXPRESS INSTANCE
const app = express();

// GETS THE CURRENT DIRECTORY OF THE FILE
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// SERVER PORT DEFINITION
const port = process.env.PORT_SERVER || 9001;

// MIDDLEWARE TO SERVE STATIC FILES
app.use(express.static(path.join(__dirname, "src/public")));

// MIDDLEWARE PARA PARSE DE JSON
app.use(express.json());

// USE THE EMAIL ROUTES
app.use("/", router);

// STANDARD ROUTE TO SERVE THE MAIN PAGE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/views/homeView.html"));
});

app.get("/biografias", (req, res) => {
    const registerFilePath = path.join(__dirname, "src/public/views/biographyView.html");

    fs.access(registerFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Arquivo "biographyView.html" não encontrado: ${err}`);
            return res.status(404).send("Página não encontrada");
        }

        res.sendFile(registerFilePath);
    });
});

app.get("/citacoes", (req, res) => {
    const registerFilePath = path.join(__dirname, "src/public/views/quoteView.html");

    fs.access(registerFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Arquivo "quoteView.html" não encontrado: ${err}`);
            return res.status(404).send("Página não encontrada");
        }

        res.sendFile(registerFilePath);
    });
});

// START SERVER
app.listen(port, () => {
    console.log(`Server running on the port: ${port}`);
});