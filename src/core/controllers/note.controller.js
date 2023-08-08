import { FrontendPagination } from '../../common/pagination/frontend.pagination.js';
import { validateCreateNoteDto, validateUpdateNoteDto } from '../validators/note.dto.validate.js';
import { noteService } from '../services/note.service.js';
import { StatusCodes } from 'http-status-codes';
import { validateQuery } from '../validators/query.validate.js';

class NoteController {
  async getAll(req, res) {
    const { page, size } = validateQuery(req.query);
    const pagination = { page, size };
    const notes = await noteService.getAll({ pagination, filters });
    res.status(StatusCodes.OK).json(new FrontendPagination(notes.records, notes.totalRecordsNumber));
  }

  async getById(req, res) {
    const { id } = req.params;
    const note = await noteService.getById(id);
    res.status(StatusCodes.OK).json(note);
  }

  async create(req, res) {
    const createNoteDto = validateCreateNoteDto(req.body);

    const createdNote = await noteService.create(createNoteDto);
    res.status(StatusCodes.CREATED).json(createdNote);
  }

  async updateById(req, res) {
    const { id } = req.params;
    const updateNoteDto = validateUpdateNoteDto(req.body);

    const updatedNote = await noteService.updateById(id, updateNoteDto);
    res.status(StatusCodes.OK).json(updatedNote);
  }

  async deleteById(req, res) {
    const { id } = req.params;

    await noteService.deleteById(id);
    res.status(StatusCodes.NO_CONTENT).end();
  }
}

export const noteController = new NoteController();
