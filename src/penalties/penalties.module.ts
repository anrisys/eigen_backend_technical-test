import { Module } from '@nestjs/common';
import { PenaltiesRepository } from './penalties.repository';
import { PenaltiesService } from './penalties.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PenaltiesRepository, PenaltiesService],
  exports: [PenaltiesRepository, PenaltiesService],
})
export class PenaltiesModule {}
