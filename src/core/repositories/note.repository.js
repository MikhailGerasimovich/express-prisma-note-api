import { defaultPagination } from '../../common/pagination/default.pagination.js';
import { offset } from '../../common/pagination/offset.pagination.js';
import { prisma } from '../../database/prisma.client.js';
import { noteFiltration } from '../filters/note.filter.js';

class NoteRepository {
  async getAll(options) {
    const pagination = options?.pagination;
    const page = Number(pagination?.page) || defaultPagination.page;
    const size = Number(pagination?.size) || defaultPagination.size;

    const filterOptions = options?.filterOptions;
    const filters = noteFiltration(filterOptions);

    const records = await prisma.note.findMany({
      where: { ...filters },
      skip: offset(page, size),
      take: size,

      include: {
        color: true,
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });
    const totalRecordsNumber = await prisma.note.count({ where: { ...filters } });

    return { records, totalRecordsNumber };
  }

  async getById(id) {
    const note = await prisma.note.findUnique({
      where: { id: Number(id) },
      include: {
        color: true,
        tags: {
          select: {
            tag: true,
          },
        },
      },
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
          connect: { id: note.color.id },
        },

        tags: {
          create: note.tags.map((tag) => ({ tag: { connect: { id: tag.id } } })),
        },
      },

      include: {
        color: true,
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    return createdNote;
  }

  async updateById(id, newNote) {
    const updateObject = {
      title: newNote.title,
      description: newNote.description,
      location: newNote.location,
      updatedAt: newNote.updatedAt,
    };

    if (newNote.color) {
      updateObject.colorId = newNote.color.id;
    }

    if (newNote.tags) {
      updateObject.tags = {
        deleteMany: { noteId: Number(id) },
        create: newNote.tags.map((tag) => ({ tag: { connect: { id: tag.id } } })),
      };
    }

    const updatedNote = await prisma.note.update({
      where: { id: Number(id) },
      data: updateObject,
      include: {
        color: true,
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    return updatedNote;
  }

  async deleteById(id) {
    await prisma.note.update({
      where: { id: Number(id) },
      data: {
        tags: {
          deleteMany: { noteId: Number(id) },
        },
      },
    });
    await prisma.note.delete({ where: { id: Number(id) } });
  }
}

export const noteRepository = new NoteRepository();
