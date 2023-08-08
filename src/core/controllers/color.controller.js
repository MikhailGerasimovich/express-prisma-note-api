import { FrontendPagination } from '../../common/pagination/frontend.pagination.js';
import { validateCreateColorDto, validateUpdateColorDto } from '../validators/color.dto.validate.js';
import { colorService } from '../services/color.service.js';
import { StatusCodes } from 'http-status-codes';
import { validateQuery } from '../validators/query.validate.js';

class ColorController {
  async getAll(req, res) {
    const { page, size } = validateQuery(req.query);
    const pagination = { page, size };
    const colors = await colorService.getAll({ pagination });
    res.status(StatusCodes.OK).json(new FrontendPagination(colors.records, colors.totalRecordsNumber));
  }

  async getById(req, res) {
    const { id } = req.params;
    const color = await colorService.getById(id);
    res.status(StatusCodes.OK).json(color);
  }

  async create(req, res) {
    const createColorDto = validateCreateColorDto(req.body);
    const createdColor = await colorService.create(createColorDto);
    res.status(StatusCodes.CREATED).json(createdColor);
  }

  async updateById(req, res) {
    const { id } = req.params;
    const updateColorDto = validateUpdateColorDto(req.body);
    const updatedColor = await colorService.updateById(id, updateColorDto);
    res.status(StatusCodes.OK).json(updatedColor);
  }

  async deleteById(req, res) {
    const { id } = req.params;

    await colorService.deleteById(id);
    res.status(StatusCodes.NO_CONTENT).end();
  }
}

export const colorController = new ColorController();
