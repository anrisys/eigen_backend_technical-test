import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Members } from './members.entity';
import { MemberController } from './members.controller';
import { MembersService } from './members.service';
import { MembersRepository } from './members.repository';
import { BorrowingsModule } from 'src/borrowing/borrowings.module';
import { Borrowings } from 'src/borrowing/borrowings.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Members, Borrowings]),
    forwardRef(() => BorrowingsModule),
  ],
  controllers: [MemberController],
  providers: [MembersService, MembersRepository],
  exports: [MembersRepository],
})
export class MemberModule {}
