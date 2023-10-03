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

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  create(
    @Body() createAnimalDto: CreateAnimalDto,
  ): Promise<MyResponse<Animal>> {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  @Get(':animal_id')
  findOne(
    @Param('animal_id', ParseUUIDPipe) animal_id: string,
  ): Promise<MyResponse<Animal>> {
    return this.animalsService.findOne(animal_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(+id);
  }
}
