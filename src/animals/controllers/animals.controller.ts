import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';

import { AnimalsService } from '../services';
import { CreateAnimalDto, UpdateAnimalDto } from '../dto';
import { MyResponse } from 'src/core';
import { Animal } from '../entities';
import { Auth } from 'src/auth/decorators';

@Controller('animals')
@Auth()
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  create(
    @Body() createAnimalDto: CreateAnimalDto,
  ): Promise<MyResponse<Animal>> {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  findAll(): Promise<MyResponse<Animal[]>> {
    return this.animalsService.findAll();
  }

  @Get(':animal_id')
  findOne(
    @Param('animal_id', ParseUUIDPipe) animal_id: string,
  ): Promise<MyResponse<Animal>> {
    return this.animalsService.findOne(animal_id);
  }

  @Patch(':animal_id')
  update(
    @Param('animal_id', ParseUUIDPipe) animal_id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ): Promise<MyResponse<Animal>> {
    return this.animalsService.update(animal_id, updateAnimalDto);
  }

  @Delete(':animal_id')
  remove(
    @Param('animal_id', ParseUUIDPipe) animal_id: string,
  ): Promise<MyResponse<Record<string, never>>> {
    return this.animalsService.remove(animal_id);
  }
}
