import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import sharp from "sharp";
import fs from "fs";
import path from "path";
async function storePhoto(req: Request, res: Response, next: NextFunction) {
  try {
    const data: string[] = [];
    const files = req.files || [];
    if (files) {
      //@ts-ignore
      await files.map(
        async (file: {
          path: string;
          destination: string;
          filename: string;
        }) => {
          const fileName = file.filename.split(".");
          const image = fileName[0] + ".webp";
          await sharp(file.path)
            .webp({ quality: 50 })
            .toFile(`${file.destination}/${image}`);
          fs.unlinkSync(file.path);
        }
      );
    }
    //@ts-ignore
    const image_path = files.map((item: { filename: string }) => {
      const fileName = item.filename.split(".");
      const image = fileName[0] + ".webp";
      return "products/" + image;
    });
    res.status(201).json({
      success: {
        message: "Photo upload successfully.",
        data: JSON.stringify(image_path),
      },
    });
  } catch (error) {
    next(error);
  }
}

export { storePhoto };
