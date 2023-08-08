import { prisma } from '../../database/prisma.client.js';
import { offset } from '../../common/pagination/offset.pagination.js';
import { defaultPagination } from '../../common/pagination/default.pagination.js';

class TagRepository {
  async getAll(options) {
    const pagination = options?.pagination;
    const page = parseInt(pagination?.page) ?? defaultPagination.page;
    const size = parseInt(pagination?.size) ?? defaultPagination.size;
    const records = await prisma.tag.findMany({
      skip: offset(page, size),
      take: size,
    });
    const totalRecordsNumber = await prisma.tag.count();

    return { records, totalRecordsNumber };
  }

  async getById(id) {
    const tag = await prisma.tag.findUnique({
      where: { id: Number(id) },
    });
    return tag;
  }

  async getByTitle(title) {
    const tag = await prisma.tag.findUnique({
      where: { title },
    });
    return tag;
  }

  async create(tag) {
    const createdTag = await prisma.tag.create({
      data: { title: tag.title },
    });
    return createdTag;
  }

  async updateById(id, newTag) {
    const updatedTag = await prisma.tag.update({
      where: { id: Number(id) },
      data: { title: newTag.title },
    });
    return updatedTag;
  }

  async deleteById(id) {
    await prisma.tag.delete({
      where: { id: Number(id) },
    });
  }
}

export const tagRepository = new TagRepository();
