import { forwardRef, Module } from '@nestjs/common';
import { PenaltiesRepository } from './penalties.repository';
import { PenaltiesService } from './penalties.service';
import { MemberModule } from 'src/members/members.module';
import { BorrowingsModule } from 'src/borrowing/borrowings.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Penalties } from './penalties.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Penalties]),
    forwardRef(() => BorrowingsModule),
    MemberModule,
  ],
  controllers: [],
  providers: [PenaltiesRepository, PenaltiesService],
  exports: [PenaltiesRepository, PenaltiesService],
})
export class PenaltiesModule {}
