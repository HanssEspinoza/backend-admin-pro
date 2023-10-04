import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAnimalDto } from '../dto/create-animal.dto';
import { UpdateAnimalDto } from '../dto/update-animal.dto';
import { Animal, Diet, Species } from '../entities';
import { Repository } from 'typeorm';
import { MyResponse } from 'src/core';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,

    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,

    @InjectRepository(Diet)
    private readonly dietRepository: Repository<Diet>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<MyResponse<Animal>> {
    const { species_id, ...allData } = createAnimalDto;

    const diets: Diet[] = [];

    for (const diet_id of allData.diets) {
      const diet = await this.dietRepository.findOneBy({ diet_id });

      if (diet) {
        diets.push(diet);
      } else {
        throw new NotFoundException(`La dieta #${diet_id} no existe`);
      }
    }

    const species = await this.speciesRepository.preload({
      species_id,
      diets,
    });

    if (!species)
      throw new NotFoundException(`La especie #${species_id} no existe`);

    try {
      await this.speciesRepository.save(species);

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

  async findAll(): Promise<MyResponse<Animal[]>> {
    const animals: Animal[] = await this.animalRepository.find({
      where: { is_alive: true },
    });

    const response: MyResponse<Animal[]> = {
      statusCode: 200,
      status: 'OK',
      message: 'Lista de animales',
      reply: animals,
    };

    return response;
  }

  async findOne(animal_id: string): Promise<MyResponse<Animal>> {
    const animal = await this.animalRepository.findOne({
      where: { animal_id },
      relations: [
        'species',
        'species.biome',
        'species.diets',
        'medical_record',
      ],
    });

    if (!animal)
      throw new NotFoundException(`El animal #${animal_id} no fue encontrado.`);

    const response: MyResponse<Animal> = {
      statusCode: 200,
      status: 'OK',
      message: `El animal ${animal.name} fue encontrado con éxito`,
      reply: animal,
    };

    return response;
  }

  async update(
    animal_id: string,
    updateAnimalDto: UpdateAnimalDto,
  ): Promise<MyResponse<Animal>> {
    const animal = await this.animalRepository.preload({
      animal_id,
      ...updateAnimalDto,
    });

    if (!animal)
      throw new NotFoundException(`El animal #${animal_id} no fue encontrado`);

    try {
      await this.animalRepository.save(animal);

      const response: MyResponse<Animal> = {
        statusCode: 200,
        status: 'OK',
        message: `El animal ${animal.name} fue actualizado correctamente`,
        reply: animal,
      };

      return response;
    } catch (error) {
      console.log(error);
      this.handleDBErrors(error);
    }
  }

  async remove(animal_id: string): Promise<MyResponse<Record<string, never>>> {
    const animal = await this.animalRepository.preload({
      animal_id,
      is_alive: false,
    });

    if (!animal)
      throw new NotFoundException(`El animal #${animal_id} no fue encontrado`);

    try {
      await this.animalRepository.save(animal);

      const response: MyResponse<Record<string, never>> = {
        statusCode: 200,
        status: 'OK',
        message: `El animal ${animal.name} fue dado de baja correctamente`,
        reply: {},
      };

      return response;
    } catch (error) {
      console.log(error);
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    throw new BadRequestException(`Error: ${error.detail}`);
  }
}
