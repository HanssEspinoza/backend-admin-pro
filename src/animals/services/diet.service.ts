import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Diet } from '../entities';
import { CreateDietDto } from '../dto';
import { MyResponse, handleDBErrors } from 'src/core';

@Injectable()
export class DietService {
  constructor(
    @InjectRepository(Diet)
    private readonly dietRepository: Repository<Diet>,
  ) {}

  async create(createDietDto: CreateDietDto): Promise<MyResponse<Diet>> {
    const { name, description } = createDietDto;

    const dietVerification = await this.dietRepository.findOne({
      where: { name },
    });

    if (dietVerification)
      throw new BadRequestException(`La dieta ${name} ya existe`);

    try {
      const diet = this.dietRepository.create({
        name,
        description,
      });

      await this.dietRepository.save(diet);

      const response: MyResponse<Diet> = {
        statusCode: 201,
        status: 'Created',
        message: `La dieta ${diet.name} fue creada exitosamente`,
        reply: diet,
      };

      return response;
    } catch (error) {
      console.log(error);
      handleDBErrors(error);
    }
  }
}
