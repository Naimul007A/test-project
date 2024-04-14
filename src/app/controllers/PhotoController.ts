import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import crypto from "crypto";
import sharp from "sharp";
import path from "path";
async function storePhoto(req: Request, res: Response, next: NextFunction) {
  try {
    const imagePath: any = [];
    const imgPath: any = path.join(
      __dirname,
      "../../../public/uploads/products/"
    );
    const images = req.body.images || [];
    await images.map(async (data: any) => {
      const buffer = Buffer.from(data, "base64");
      const randomName = crypto.randomBytes(20).toString("hex");
      const imageName = `${randomName}.webp`;
      imagePath.push(`products/${imageName}`);
      const resizedImageBuffer = await sharp(buffer).webp({ quality: 50 }).toBuffer();
      await sharp(resizedImageBuffer).toFile(`${imgPath}${imageName}`);
    });
    // if (files) {
    //   //@ts-ignore
    //   await files.map(
    //     async (file: {
    //       path: string;
    //       destination: string;
    //       filename: string;
    //     }) => {
    //       const fileName = file.filename.split(".");
    //       const image = fileName[0] + ".webp";
    //       await sharp(file.path)
    //         .webp({ quality: 50 })
    //         .toFile(`${file.destination}/${image}`);
    //       fs.unlinkSync(file.path);
    //     }
    //   );
    // }
    // //@ts-ignore
    // const image_path = files.map((item: { filename: string }) => {
    //   const fileName = item.filename.split(".");
    //   const image = fileName[0] + ".webp";
    //   return "products/" + image;
    // });
    // console.log(imagePath);
    res.status(201).json({
      success: {
        message: "Photo upload successfully.",
        data: JSON.stringify(imagePath),
      },
    });
  } catch (error) {
    next(error);
  }
}

export { storePhoto };
