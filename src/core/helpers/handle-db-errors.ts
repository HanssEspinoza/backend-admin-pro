import { BadRequestException } from '@nestjs/common';

export const handleDBErrors = (error: any): never => {
  throw new BadRequestException(`Error: ${error.detail}`);
};
