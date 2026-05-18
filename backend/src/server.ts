import process from "node:process";
import { configDotenv } from "dotenv";
import express from "express"
import cors from "cors"
import path from "node:path";

import router from "../src/routes/notes_routes.ts";
import { connectDB } from "./config/db.ts";
import rateLimiter from "./middleware/rateLimiter.ts";
import errorHandler from "./middleware/errorHandler.ts";

configDotenv({
    quiet:true,
    debug:false,
    encoding:"UTF-8"
})

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production") {
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

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server started at port", port);
    })
})