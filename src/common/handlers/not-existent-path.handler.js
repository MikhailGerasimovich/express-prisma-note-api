import { StatusCodes } from 'http-status-codes';

export function NotExistentPathHandler(req, res) {
  res.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    name: 'Not Found Exception',
    message: 'The specified request path or method does not exist',
  });
}
