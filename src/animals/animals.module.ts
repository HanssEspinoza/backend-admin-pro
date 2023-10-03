import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimalsService, SpeciesService } from './services';
import { AnimalsController, SpeciesController } from './controllers';
import { Animal, Biome, Species } from './entities';
import { BiomeController } from './controllers/biome.controller';
import { BiomeService } from './services/biome.service';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Species, Biome])],
  controllers: [AnimalsController, SpeciesController, BiomeController],
  providers: [AnimalsService, SpeciesService, BiomeService],
})
export class AnimalsModule {}
