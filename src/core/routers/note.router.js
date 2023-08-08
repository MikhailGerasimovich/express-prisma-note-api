import express from 'express';
import { errorHandler } from '../../common/handlers/error.handler.js';
import { noteController } from '../controllers/note.controller.js';

export const noteRouter = express.Router();

noteRouter.get('/', errorHandler(noteController.getAll));
noteRouter.get('/:id', errorHandler(noteController.getById));
noteRouter.post('/', errorHandler(noteController.create));
noteRouter.put('/:id', errorHandler(noteController.updateById));
noteRouter.delete('/:id', errorHandler(noteController.deleteById));
