import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAnimalDto } from '../dto/create-animal.dto';
import { UpdateAnimalDto } from '../dto/update-animal.dto';
import { Animal } from '../entities';
import { Repository } from 'typeorm';
import { MyResponse } from 'src/core';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<MyResponse<Animal>> {
    try {
      const animal = await this.animalRepository.create(createAnimalDto);

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
