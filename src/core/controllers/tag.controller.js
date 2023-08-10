import { validateCreateTagDto, validateUpdateTagDto } from '../validators/dto/tag.dto.validator.js';
import { tagService } from '../services/tag.service.js';
import { PaginationFrontend } from '../../common/pagination/frontend.pagination.js';
import { StatusCodes } from 'http-status-codes';
import { validatePagination } from '../validators/pagination/pagination.validator.js';
import { TagFrontend } from '../frontend/tag.frontend.js';
import { validateTagFilter } from '../validators/filter/tag.filter.validator.js';

class TagController {
  async getAll(req, res) {
    const { page, size, ...args } = validatePagination(req.query);
    const filterOptions = validateTagFilter(args);
    const pagination = { page, size };
    const tags = await tagService.getAll({ pagination, filterOptions });
    res.status(StatusCodes.OK).json(
      new PaginationFrontend(
        tags.records.map((tag) => new TagFrontend(tag)),
        tags.totalRecordsNumber
      )
    );
  }

  async getById(req, res) {
    const { id } = req.params;
    const tag = await tagService.getById(id);
    res.status(StatusCodes.OK).json(new TagFrontend(tag));
  }

  async create(req, res) {
    const createTagDto = validateCreateTagDto(req.body);
    const createdTag = await tagService.create(createTagDto);
    res.status(StatusCodes.CREATED).json(new TagFrontend(createdTag));
  }

  async updateById(req, res) {
    const { id } = req.params;
    const updateTagDto = validateUpdateTagDto(req.body);
    const updatedTag = await tagService.updateById(id, updateTagDto);
    res.status(StatusCodes.OK).json(new TagFrontend(updatedTag));
  }

  async deleteById(req, res) {
    const { id } = req.params;

    await tagService.deleteById(id);
    res.status(StatusCodes.NO_CONTENT).end();
  }
}

export const tagController = new TagController();
