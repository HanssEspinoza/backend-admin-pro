import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimalsService, SpeciesService, BiomeService } from './services';
import {
  AnimalsController,
  SpeciesController,
  BiomeController,
} from './controllers';
import { Animal, Biome, MedicalRecord, Species } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Species, Biome, MedicalRecord])],
  controllers: [AnimalsController, SpeciesController, BiomeController],
  providers: [AnimalsService, SpeciesService, BiomeService],
})
export class AnimalsModule {}
