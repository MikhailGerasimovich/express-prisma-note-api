import { BadRequestException } from '../../common/exceptions/bad-request.exception.js';
import { NotFoundException } from '../../common/exceptions/not-found.exception.js';
import { noteRepository } from '../repositories/note.repository.js';
import { colorService } from './color.service.js';
import { tagService } from './tag.service.js';

class NoteService {
  async getAll(options) {
    const notes = await noteRepository.getAll(options);
    return notes;
  }

  async getById(id) {
    if (!id) {
      throw new BadRequestException('id parameter not passed');
    }

    const note = await noteRepository.getById(id);

    if (!note) {
      throw new NotFoundException(`note with id=${id} not found`);
    }

    return note;
  }

  async create(noteData) {
    const tags = noteData.tags;
    const color = noteData.color;

    noteData.tags = await this._createTagsIfNotExist(tags);
    noteData.color = await this._createColorIfNotExist(color);

    const note = {
      title: noteData.title,
      description: noteData.description,
      location: noteData.location,
      updatedAt: new Date(),
      tags: noteData.tags,
      color: noteData.color,
    };

    const createdNote = await noteRepository.create(note);
    return createdNote;
  }

  async updateById(id, newNoteData) {
    const existingNote = await noteRepository.getById(id);

    if (!existingNote) {
      throw new NotFoundException(`note with id=${id} not found`);
    }

    const color = newNoteData.color ? await this._createColorIfNotExist(newNoteData.color) : undefined;
    const tags = newNoteData.tags ? await this._createTagsIfNotExist(newNoteData.tags) : undefined;

    const newNote = {
      title: newNoteData.title || existingNote.title,
      description: newNoteData.description || existingNote.description,
      location: newNoteData.location || existingNote.location,
      updatedAt: new Date(),
      tags: tags,
      color: color,
    };

    const updatedNote = await noteRepository.updateById(id, newNote);

    return updatedNote;
  }

  async deleteById(id) {
    if (!id) {
      throw new BadRequestException('id parameter not passed');
    }

    const note = await noteRepository.getById(id);

    if (!note) {
      throw new NotFoundException(`note with id=${id} not found`);
    }

    await noteRepository.deleteById(id);
  }

  async _createTagsIfNotExist(tagsTitle) {
    const tags = [];
    for await (let tag of tagsTitle) {
      const existingTag = await tagService.getByTitle(tag);
      if (!existingTag) {
        tags.push(await tagService.create({ title: tag }));
        continue;
      }
      tags.push(existingTag);
    }
    return tags;
  }

  async _createColorIfNotExist(color) {
    const existingColor = await colorService.getByTitle(color);
    if (!existingColor) {
      return await colorService.create({ title: color });
    }
    return existingColor;
  }
}

export const noteService = new NoteService();
