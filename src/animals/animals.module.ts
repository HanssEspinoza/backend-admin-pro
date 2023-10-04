import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AnimalsService,
  SpeciesService,
  BiomeService,
  DietService,
} from './services';
import {
  AnimalsController,
  SpeciesController,
  BiomeController,
  DietController,
} from './controllers';
import { Animal, Biome, Diet, MedicalRecord, Species } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Animal, Species, Biome, MedicalRecord, Diet]),
  ],
  controllers: [
    AnimalsController,
    SpeciesController,
    BiomeController,
    DietController,
  ],
  providers: [AnimalsService, SpeciesService, BiomeService, DietService],
})
export class AnimalsModule {}
