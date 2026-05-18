import process from "node:process";
import { configDotenv } from "dotenv";
import express from "express"
import type { Request, Response } from "express";
import cors from "cors"
import path from "node:path";

import router from "../src/routes/notes_routes.ts";
import { connectDB } from "./config/db.ts";
import rateLimiter from "./middleware/rateLimiter.ts";
import errorHandler from "./middleware/errorHandler.ts";

configDotenv({
    quiet: true,
    debug: false,
    encoding: "UTF-8"
})

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173"
        })
    )
}

app.use(express.json());
app.use(rateLimiter)
app.use("/api/notemaker", router);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.use((req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server started at port", port);
    })
})