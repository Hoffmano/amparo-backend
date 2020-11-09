import express from "express";
import routes from "./routes.js";
import cors from "cors"
import "./database/index.js"

const PORT = 3000;
const HOST = "0.0.0.0";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(PORT, HOST);