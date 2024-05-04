import Path from "path";
import fs from "fs";
import createHttpError from "http-errors";
async function DeletePhoto(params: string) {
  const path = Path.join(__dirname, `../../../public/uploads/${params}`);
  console.log(path);
  if (fs.existsSync(path)) {
    fs.unlink(path, (err) => {
      if (err) throw createHttpError.InternalServerError();
    });
  }
}

export { DeletePhoto };
