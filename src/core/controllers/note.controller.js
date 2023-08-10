import { PaginationFrontend } from '../../common/pagination/frontend.pagination.js';
import { validateCreateNoteDto, validateUpdateNoteDto } from '../validators/dto/note.dto.validator.js';
import { noteService } from '../services/note.service.js';
import { StatusCodes } from 'http-status-codes';
import { validatePagination } from '../validators/pagination/pagination.validator.js';
import { NoteFrontend } from '../frontend/note.frontend.js';
import { validateNoteFilter } from '../validators/filter/note.filter.validator.js';

class NoteController {
  async getAll(req, res) {
    const { page, size, ...args } = validatePagination(req.query);
    const filterOptions = validateNoteFilter(args);
    const pagination = { page, size };
    const notes = await noteService.getAll({ pagination, filterOptions });
    res.status(StatusCodes.OK).json(
      new PaginationFrontend(
        notes.records.map((noteObject) => new NoteFrontend(noteObject)),
        notes.totalRecordsNumber
      )
    );
  }

  async getById(req, res) {
    const { id } = req.params;
    const note = await noteService.getById(id);
    res.status(StatusCodes.OK).json(new NoteFrontend(note));
  }

  async create(req, res) {
    const createNoteDto = validateCreateNoteDto(req.body);

    const createdNote = await noteService.create(createNoteDto);
    res.status(StatusCodes.CREATED).json(new NoteFrontend(createdNote));
  }

  async updateById(req, res) {
    const { id } = req.params;
    const updateNoteDto = validateUpdateNoteDto(req.body);

    const updatedNote = await noteService.updateById(id, updateNoteDto);
    res.status(StatusCodes.OK).json(new NoteFrontend(updatedNote));
  }

  async deleteById(req, res) {
    const { id } = req.params;

    await noteService.deleteById(id);
    res.status(StatusCodes.NO_CONTENT).end();
  }
}

export const noteController = new NoteController();
