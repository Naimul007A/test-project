import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import crypto from "crypto";
import sharp from "sharp";
import path from "path";
import { DeletePhoto } from "@helpers/photoDelete";
import { multiDeletePhoto } from "../helpers/MultiPhotoDelete";
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
        const inputImage = sharp(resizedImageBuffer);
        const metadata = await inputImage.metadata();
        const width = metadata.width;
        const height = metadata.height ?? 0;
        const code = `POD-${req.body.code || 123}`;
        const text = code;
        // Set text position for bottom-left corner
        const padding = 20; // Add padding from the edges
        const textX = padding; // x-coordinate: padding from the left
        const textY = height - padding; // y-coordinate: padding from the bottom

        const svgImage = `
        <svg width="${width}" height="${height}">
            <style>
                .title { fill: #ff3333; font-size: 50px; font-weight: bold;}
            </style>
            <text x="${textX}" y="${textY}" text-anchor="start" class="title">${text}</text>
        </svg>
        `;
        const svgBuffer = Buffer.from(svgImage);
        // Apply the text overlay and save the output
        await inputImage
          .composite([
            {
              input: svgBuffer,
              top: 0,
              left: 0,
            },
          ])
          .toFile(`${imgPath}${imageName}`);
      });
    } else {
      throw createHttpError.UnprocessableEntity();
    }
    if (req.body.old_photo) {
      await DeletePhoto(req.body.old_photo);
    }
    if (req.body.old) {
      console.log("old", req.body.old);
      await JSON.parse(req.body.old).map(async (photo: string) => {
        await DeletePhoto(photo);
      });
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

async function photoDelete(req: Request, res: Response, next: NextFunction) {
  try {
    const image = req.body.image;
    await DeletePhoto(image);
    res.status(200).json({
      success: {
        message: "Image Delete successfully.",
        data: "",
      },
    });
  } catch (error) {
    next(error);
  }
}
async function deleteMultiPhoto(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const images = req.body.images;
    console.log("body", req.body);
    await multiDeletePhoto(images);
    res.status(200).json({
      success: {
        message: "Delete successfully.",
        data: "null",
      },
    });
  } catch (error) {
    next(error);
  }
}

export { storePhoto, photoStore, photoDelete, deleteMultiPhoto };
