import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Species } from '../entities';
import { CreateSpeciesDto } from '../dto';
import { MyResponse } from 'src/core';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) {}

  async create(
    createSpeciesDto: CreateSpeciesDto,
  ): Promise<MyResponse<Species>> {
    const { name, ...allData } = createSpeciesDto;

    const speciesVerification = await this.speciesRepository.findOne({
      where: { name },
    });

    if (speciesVerification)
      throw new BadRequestException(`La especie ${name} ya existe`);

    try {
      const species = this.speciesRepository.create({
        name,
        ...allData,
      });

      await this.speciesRepository.save(species);

      const response: MyResponse<Species> = {
        statusCode: 201,
        status: 'Created',
        message: `La especie ${name} fue creada exitosamente`,
        reply: species,
      };

      return response;
    } catch (error) {
      console.log(error);
      this.handleDBErrors(error);
    }
  }

  async getSpecies(species_id: string): Promise<MyResponse<Species>> {
    const species = await this.speciesRepository.findOne({
      where: { species_id },
      relations: ['animals'],
    });

    if (!species)
      throw new NotFoundException(`La especie #${species_id} no existe`);

    const response: MyResponse<Species> = {
      statusCode: 200,
      status: 'OK',
      message: `La especie #${species_id} fue encontrada exitosamente`,
      reply: species,
    };

    return response;
  }

  private handleDBErrors(error: any): never {
    throw new BadRequestException(`Error: ${error.detail}`);
  }
}
