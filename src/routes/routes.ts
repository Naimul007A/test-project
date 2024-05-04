import express, { NextFunction, Request, Response, Router } from "express";
import { apiHealth, testData } from "@controllers/ServerController";
import multer from "multer";
import { storage } from "@helpers/Multer";
import {
  deleteMultiPhoto,
  photoDelete,
  photoStore,
  storePhoto,
} from "@controllers/PhotoController";
const route: Router = express.Router();
const storage1 = multer.memoryStorage();
const upload1 = multer({ storage: storage1 });
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 12,
  },
});

//check api health
route.get("/health", apiHealth);
route.post("/photos", upload1.array("images", 12), photoStore);
route.post("/photos/delete-photo", photoDelete);
route.post("/photos/delete", deleteMultiPhoto);
route.get("/test-data", testData);

export { route };
