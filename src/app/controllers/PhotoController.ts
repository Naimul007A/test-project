import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import crypto from "crypto";
import sharp from "sharp";
import path from "path";
async function storePhoto(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.body);
    const imagePath: any = [];
    const imgPath: any = path.join(
      __dirname,
      "../../../public/uploads/products/"
    );
    const images = req.body.images || [];
    console.log(images);
    if (images.length === 0)
      throw createHttpError.UnprocessableEntity("Images is required.");
    await images.map(async (data: any) => {
      const buffer = Buffer.from(data, "base64");
      const randomName = crypto.randomBytes(20).toString("hex");
      const imageName = `${randomName}.webp`;
      imagePath.push(`products/${imageName}`);
      const resizedImageBuffer = await sharp(buffer)
        .webp({ quality: 50 })
        .toBuffer();
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

async function photoStore(req: Request, res: Response, next: NextFunction) {
  try {
    const folder = req.body.folder || "products";
    let imagePath: string | string[] = [];
    const imgPath: string = path.join(
      __dirname,
      `../../../public/uploads/${folder}/`
    );
    // if file is single
    if (req.file) {
      const image = req.file || "";
      const randomName = crypto.randomBytes(20).toString("hex");
      const imageName = `${randomName}.webp`;
      imagePath = `${folder}/${imageName}`;
      if (image) {
        const resizedImageBuffer = await sharp(image.buffer)
          .webp({ quality: 50 })
          .toBuffer();
        await sharp(resizedImageBuffer).toFile(`${imgPath}${imageName}`);
      }
    } else {
      const images = req.files || [];
      if (images) {
        //@ts-ignore
        await images.map(async (image) => {
          const randomName = crypto.randomBytes(20).toString("hex");
          const imageName = `${randomName}.webp`;
          //@ts-ignore
          imagePath.push(`${folder}/${imageName}`);
          const resizedImageBuffer = await sharp(image.buffer)
            .webp({ quality: 50 })
            .toBuffer();
          await sharp(resizedImageBuffer).toFile(`${imgPath}${imageName}`);
        });
      }
    }

    res.status(200).json({
      success: {
        message: "Image Store successfully.",
        data: imagePath,
      },
    });
  } catch (error) {
    next(error);
  }
}

export { storePhoto, photoStore };
