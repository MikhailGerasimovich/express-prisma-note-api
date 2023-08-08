import { BadRequestException } from '../../common/exceptions/bad-request.exception.js';
import { NotFoundException } from '../../common/exceptions/not-found.exception.js';
import { colorRepository } from '../repositories/color.repository.js';

class ColorService {
  async getAll(options) {
    const colors = await colorRepository.getAll(options);
    return colors;
  }

  async getById(id) {
    if (!id) {
      throw new BadRequestException('id parameter not passed');
    }

    const color = await colorRepository.getById(id);

    if (!color) {
      throw new NotFoundException(`color with id=${id} not found`);
    }

    return color;
  }

  async getByTitle(title) {
    const color = await colorRepository.getByTitle(title);
    return color;
  }

  async create(colorData) {
    const color = {
      title: colorData.title,
    };

    const createdColor = await colorRepository.create(color);
    return createdColor;
  }

  async updateById(id, newColorData) {
    const newColor = {
      title: newColorData.title,
    };
    const updatedColor = await colorRepository.updateById(id, newColor);
    return updatedColor;
  }

  async deleteById(id) {
    if (!id) {
      throw new BadRequestException('id parameter not passed');
    }

    const color = await colorRepository.getById(id);

    if (!color) {
      throw new NotFoundException(`color with id=${id} not found`);
    }

    await colorRepository.deleteById(id);
  }
}

export const colorService = new ColorService();
