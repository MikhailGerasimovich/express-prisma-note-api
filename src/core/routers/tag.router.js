import express from 'express';
import { errorHandler } from '../../common/handlers/error.handler.js';
import { tagController } from '../controllers/tag.controller.js';

export const tagRouter = express.Router();

tagRouter.get('/', errorHandler(tagController.getAll));
tagRouter.get('/:id', errorHandler(tagController.getById));
tagRouter.post('/', errorHandler(tagController.create));
tagRouter.put('/:id', errorHandler(tagController.updateById));
tagRouter.delete('/:id', errorHandler(tagController.deleteById));
