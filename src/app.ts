import express, { Application, NextFunction, Request, Response } from "express";
import { errorHandler, notFound } from "@utils/error";
import { route as Routes } from "@routes/routes";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
dotenv.config();
const app: Application = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// ^ change to this
app.use("/photos", express.static("public/uploads"));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.get("/", (req: Request, res: Response) => {
    res.send("Application is Running.");
});
//route config
app.use("/api/v1", Routes);
//handel router error
app.use(notFound);
//error check and return
app.use(errorHandler);
const PORT = process.env.PORT || 3502;
app.listen(PORT, () => {
    console.log(`Application is running at port : http://localhost:${PORT} `);
});
