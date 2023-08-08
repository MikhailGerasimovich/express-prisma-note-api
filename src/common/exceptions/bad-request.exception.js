import { StatusCodes } from 'http-status-codes';
import { BaseException } from './base.exception.js';

export class BadRequestException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'Bad Request Exception';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
