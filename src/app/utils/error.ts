import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

//Throw error properly
async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  //@ts-ignore
  if (err.isJoi === true) {
    //@ts-ignore
    err.status = 422;
  }
  //@ts-ignore
  err.status = err.status || 500;
  res.send({
    error: {
      //@ts-ignore
      status: err.status || 500,
      message: err.message,
    },
  });
}
//Route Not found
async function notFound(req: Request, res: Response, next: NextFunction) {
  next(createHttpError.NotFound("This Route not Registered."));
}

export { errorHandler, notFound };
