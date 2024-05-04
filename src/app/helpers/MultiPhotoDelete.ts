import Path from "path";
import fs from "fs";
import createHttpError from "http-errors";
async function multiDeletePhoto(params: string) {
  try {
    const images = JSON.parse(JSON.parse(params));
    images.map((data: string) => {
      const path = Path.join(__dirname, `../../../public/uploads/${data}`);
      console.log(path);
      if (fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if (err) throw createHttpError.InternalServerError();
        });
      }
    });
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
}

export { multiDeletePhoto };
