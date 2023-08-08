import { defaultPagination } from '../../common/pagination/default.pagination.js';
import { offset } from '../../common/pagination/offset.pagination.js';
import { prisma } from '../../database/prisma.client.js';

class NoteRepository {
  async getAll(options) {
    const pagination = options?.pagination;
    const page = Number(pagination?.page) || defaultPagination.page;
    const size = Number(pagination?.size) || defaultPagination.size;
    const records = await prisma.note.findMany({
      skip: offset(page, size),
      take: size,
    });
    const totalRecordsNumber = await prisma.note.count();

    return { records, totalRecordsNumber };
  }

  async getById(id) {
    const note = await prisma.note.findUnique({
      where: { id: Number(id) },
    });
    return note;
  }

  async create(note) {
    const createdNote = await prisma.note.create({
      data: {
        title: note.title,
        description: note.description,
        location: note.location,
        updatedAt: note.updateAt,

        color: {
          connect: { title: note.color.title },
        },

        tags: {
          connect: note.tags.map((tag) => ({ id: tag.id })),
        },
      },

      include: { color: true, tags: true },
    });

    return createdNote;
  }

  async updateById(id, newNote) {}

  async deleteById(id) {
    await prisma.note.delete({ where: { id: Number(id) } });
  }
}

export const noteRepository = new NoteRepository();
