import { StatusCodes } from 'http-status-codes';
import { BaseException } from '../exceptions/base.exception.js';

export function errorHandler(controllerMethod) {
  return async function (req, res, next) {
    try {
      await controllerMethod(req, res, next);
    } catch (error) {
      if (error instanceof BaseException) {
        console.log(error); //need create error classes
        res.status(error.statusCode).json({ statusCode: error.statusCode, name: error.name, message: error.message });
      } else {
        console.log(error);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, name: error.name, message: error.message });
      }
    }
    next();
  };
}
