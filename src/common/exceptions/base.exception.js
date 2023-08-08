import { StatusCodes } from 'http-status-codes';

export class BaseException extends Error {
  constructor(message) {
    super(message);
    this.name = 'Base Exception';
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
