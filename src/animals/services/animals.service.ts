import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAnimalDto } from '../dto/create-animal.dto';
import { UpdateAnimalDto } from '../dto/update-animal.dto';
import { Animal, Species } from '../entities';
import { Repository } from 'typeorm';
import { MyResponse } from 'src/core';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,

    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<MyResponse<Animal>> {
    const { species_id, ...allData } = createAnimalDto;

    const species = await this.speciesRepository.findOneBy({
      species_id,
    });

    if (!species)
      throw new NotFoundException(`La especie #${species_id} no existe`);

    try {
      const animal = await this.animalRepository.create({
        ...allData,
        species: species,
      });

      await this.animalRepository.save(animal);

      const response: MyResponse<Animal> = {
        statusCode: 201,
        status: 'Created',
        message: `El animal ${animal.name} fue registrado con éxito`,
        reply: animal,
      };

      return response;
    } catch (error) {
      console.log(error);
      this.handleDBErrors(error);
    }
  }

  findAll() {
    return `This action returns all animals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }

  private handleDBErrors(error: any): never {
    throw new BadRequestException(`Error: ${error.detail}`);
  }
}
