import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Ophanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages_view';
import validate from '../utils/validations';
export default {
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const requestFiles = request.files as Express.Multer.File[];
    const images = requestFiles.map((image) => {
      return {
        path: image.filename,
      };
    });

    const orphanagesRepository = getRepository(Ophanage);
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };
    const schema = validate.validatePostOrphanage;

    await schema.validate(data, { abortEarly: false });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return response
      .status(201)
      .json({ success: true, content: OrphanageView.render(orphanage) });
  },
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Ophanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    });

    return response
      .status(200)
      .json({ success: true, content: OrphanageView.renderMany(orphanages) });
  },
  async show(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Ophanage);
    const { id } = request.params;

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response
      .status(200)
      .json({ success: true, content: OrphanageView.render(orphanage) });
  },
};
