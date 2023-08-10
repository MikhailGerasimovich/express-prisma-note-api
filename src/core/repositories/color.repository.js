import { defaultPagination } from '../../common/pagination/default.pagination.js';
import { offset } from '../../common/pagination/offset.pagination.js';
import { prisma } from '../../database/prisma.client.js';
import { colorFiltration } from '../filters/color.filter.js';

class ColorRepository {
  async getAll(options) {
    const pagination = options?.pagination;
    const page = Number(pagination?.page) || defaultPagination.page;
    const size = Number(pagination?.size) || defaultPagination.size;

    const filterOptions = options?.filterOptions;
    const filters = colorFiltration(filterOptions);

    const records = await prisma.color.findMany({
      where: { ...filters },

      skip: offset(page, size),
      take: size,
    });
    const totalRecordsNumber = await prisma.color.count({ where: { ...filters } });

    return { records, totalRecordsNumber };
  }

  async getById(id) {
    const color = await prisma.color.findUnique({
      where: { id: Number(id) },
    });
    return color;
  }

  async getByTitle(title) {
    const color = await prisma.color.findUnique({
      where: { title },
    });
    return color;
  }

  async create(color) {
    const createdColor = await prisma.color.create({
      data: { title: color.title },
    });
    return createdColor;
  }

  async updateById(id, newColor) {
    const updatedColor = await prisma.color.update({
      where: { id: Number(id) },
      data: { title: newColor.title },
    });
    return updatedColor;
  }

  async deleteById(id) {
    await prisma.color.delete({
      where: { id: Number(id) },
    });
  }
}

export const colorRepository = new ColorRepository();
