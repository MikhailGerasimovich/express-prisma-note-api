import { PaginationFrontend } from '../../common/pagination/frontend.pagination.js';
import { validateCreateColorDto, validateUpdateColorDto } from '../validators/dto/color.dto.validator.js';
import { colorService } from '../services/color.service.js';
import { StatusCodes } from 'http-status-codes';
import { validatePagination } from '../validators/pagination/pagination.validator.js';
import { ColorFrontend } from '../frontend/color.frontend.js';
import { validateColorFilter } from '../validators/filter/color.filter.validator.js';

class ColorController {
  async getAll(req, res) {
    const { page, size, ...args } = validatePagination(req.query);
    const filterOptions = validateColorFilter(args);
    const pagination = { page, size };
    const colors = await colorService.getAll({ pagination, filterOptions });
    res.status(StatusCodes.OK).json(
      new PaginationFrontend(
        colors.records.map((color) => new ColorFrontend(color)),
        colors.totalRecordsNumber
      )
    );
  }

  async getById(req, res) {
    const { id } = req.params;
    const color = await colorService.getById(id);
    res.status(StatusCodes.OK).json(new ColorFrontend(color));
  }

  async create(req, res) {
    const createColorDto = validateCreateColorDto(req.body);
    const createdColor = await colorService.create(createColorDto);
    res.status(StatusCodes.CREATED).json(new ColorFrontend(createdColor));
  }

  async updateById(req, res) {
    const { id } = req.params;
    const updateColorDto = validateUpdateColorDto(req.body);
    const updatedColor = await colorService.updateById(id, updateColorDto);
    res.status(StatusCodes.OK).json(new ColorFrontend(updatedColor));
  }

  async deleteById(req, res) {
    const { id } = req.params;

    await colorService.deleteById(id);
    res.status(StatusCodes.NO_CONTENT).end();
  }
}

export const colorController = new ColorController();
