import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import sharp from "sharp";
//multer
const storage = multer.diskStorage({
  //@ts-ignore
  filename: function (req: Request, file, callback, next: NextFunction) {
    const some =
      Math.floor(Math.random() * 1000000000) +
      Math.random().toString(36).substring(2, 10);
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/webp"
    ) {
      const extName = path.extname(file.originalname);
      const uploadedFileName = some + extName;
      callback(null, uploadedFileName);
    } else {
      callback(new Error("Only .jpg, .jpeg, .png,.webp file accepted."));
    }
  },
  destination: (req, file, callback) => {
    let Dir = path.join(__dirname, "../../../public/uploads/products");
    callback(null, Dir);
  },
});
export { storage };
