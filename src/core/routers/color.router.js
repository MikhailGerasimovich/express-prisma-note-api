import express from 'express';
import { errorHandler } from '../../common/handlers/error.handler.js';
import { colorController } from '../controllers/color.controller.js';

export const colorRouter = express.Router();

colorRouter.get('/', errorHandler(colorController.getAll));
colorRouter.get('/:id', errorHandler(colorController.getById));
colorRouter.post('/', errorHandler(colorController.create));
colorRouter.put('/:id', errorHandler(colorController.updateById));
colorRouter.delete('/:id', errorHandler(colorController.deleteById));
