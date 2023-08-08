import express from 'express';
import { noteRouter } from './note.router.js';
import { colorRouter } from './color.router.js';
import { tagRouter } from './tag.router.js';

export const router = express.Router();

router.use('/note', noteRouter);
router.use('/color', colorRouter);
router.use('/tag', tagRouter);
