import { StatusCodes } from 'http-status-codes';
import { BaseException } from './base.exception.js';

export class NotFoundException extends BaseException {
  constructor(message) {
    super(message);
    this.name = 'Not Found Exception';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
