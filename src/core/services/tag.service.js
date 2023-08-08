import { BadRequestException } from '../../common/exceptions/bad-request.exception.js';
import { NotFoundException } from '../../common/exceptions/not-found.exception.js';
import { tagRepository } from '../repositories/tag.repository.js';

class TagService {
  async getAll(options) {
    const tags = await tagRepository.getAll(options);
    return tags;
  }

  async getById(id) {
    if (!id) {
      throw new BadRequestException('id parameter not passed');
    }

    const tag = await tagRepository.getById(id);

    if (!tag) {
      throw new NotFoundException(`tag with id=${id} not found`);
    }

    return tag;
  }

  async getByTitle(title) {
    const tag = await tagRepository.getByTitle(title);
    return tag;
  }

  async create(tagData) {
    const tag = {
      title: tagData.title,
    };

    const createdTag = await tagRepository.create(tag);
    return createdTag;
  }

  async updateById(id, newTagData) {
    const newTag = {
      title: newTagData.title,
    };
    const updatedTag = await tagRepository.updateById(id, newTag);
    return updatedTag;
  }
  async deleteById(id) {
    if (!id) {
      throw new BadRequestException('id parameter not passed');
    }

    const tag = await tagRepository.getById(id);

    if (!tag) {
      throw new NotFoundException(`tag with id=${id} not found`);
    }

    await tagRepository.deleteById(id);
  }
}

export const tagService = new TagService();
