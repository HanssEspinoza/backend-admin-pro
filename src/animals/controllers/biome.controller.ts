import { Body, Controller, Post } from '@nestjs/common';

import { BiomeService } from '../services';
import { CreateBiomeDto } from '../dto';
import { MyResponse } from 'src/core';
import { Biome } from '../entities';

@Controller('biome')
export class BiomeController {
  constructor(private readonly biomeService: BiomeService) {}

  @Post()
  create(@Body() createBiomeDto: CreateBiomeDto): Promise<MyResponse<Biome>> {
    return this.biomeService.create(createBiomeDto);
  }
}
