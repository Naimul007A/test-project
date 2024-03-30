import express, { NextFunction, Router } from "express";
import { apiHealth, testData } from "@controllers/ServerController";
import multer from "multer";
import { storage } from "@helpers/Multer";
import { storePhoto } from "@controllers/PhotoController";
const route: Router = express.Router();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 12,
  },
});

//check api health
route.get("/health", apiHealth);
route.post("/photos", upload.array("images", 6), storePhoto);
route.get("/test-data", testData);

export { route };
