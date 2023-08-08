import { validateCreateTagDto, validateUpdateTagDto } from '../validators/tag.dto.validate.js';
import { tagService } from '../services/tag.service.js';
import { FrontendPagination } from '../../common/pagination/frontend.pagination.js';
import { StatusCodes } from 'http-status-codes';
import { validateQuery } from '../validators/query.validate.js';

class TagController {
  async getAll(req, res) {
    const { page, size } = validateQuery(req.query);
    const pagination = { page, size };
    const tags = await tagService.getAll({ pagination });
    res.status(StatusCodes.OK).json(new FrontendPagination(tags.records, tags.totalRecordsNumber));
  }

  async getById(req, res) {
    const { id } = req.params;
    const tag = await tagService.getById(id);
    res.status(StatusCodes.OK).json(tag);
  }

  async create(req, res) {
    const createTagDto = validateCreateTagDto(req.body);
    const createdTag = await tagService.create(createTagDto);
    res.status(StatusCodes.CREATED).json(createdTag);
  }

  async updateById(req, res) {
    const { id } = req.params;
    const updateTagDto = validateUpdateTagDto(req.body);
    const updatedTag = await tagService.updateById(id, updateTagDto);
    res.status(StatusCodes.OK).json(updatedTag);
  }

  async deleteById(req, res) {
    const { id } = req.params;

    await tagService.deleteById(id);
    res.status(StatusCodes.NO_CONTENT).end();
  }
}

export const tagController = new TagController();
