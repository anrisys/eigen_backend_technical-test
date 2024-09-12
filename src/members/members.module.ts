import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Members } from './members.entity';
import { Borrowings } from 'src/borrowing/borrowings.entity';
import { MemberController } from './members.controller';
import { MembersService } from './members.service';
import { MembersRepository } from './members.repository';

@Module({
  imports: [SequelizeModule.forFeature([Members, Borrowings])],
  controllers: [MemberController],
  providers: [MembersService, MembersRepository],
  exports: [MembersRepository],
})
export class MemberModule {}
