import { Body, Controller, Post } from '@nestjs/common';

import { SpeciesService } from '../services';
import { CreateSpeciesDto } from '../dto/create-species.dto';
import { MyResponse } from 'src/core';
import { Species } from '../entities';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  create(
    @Body() createSpeciesDto: CreateSpeciesDto,
  ): Promise<MyResponse<Species>> {
    return this.speciesService.create(createSpeciesDto);
  }
}
