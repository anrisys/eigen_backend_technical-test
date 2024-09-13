import { forwardRef, Module } from '@nestjs/common';
import { BorrowingsRepository } from './borrowings.repository';
import { MemberModule } from 'src/members/members.module';
import { PenaltiesModule } from 'src/penalties/penalties.module';
import { BooksModule } from 'src/books/books.module';
import { BorrowingsController } from './borrowings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Borrowings } from './borrowings.entity';
import { BorrowingsService } from './borrowings.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Borrowings]),
    forwardRef(() => MemberModule),
    forwardRef(() => PenaltiesModule),
    BooksModule,
  ],
  controllers: [BorrowingsController],
  providers: [BorrowingsRepository, BorrowingsService],
  exports: [BorrowingsRepository],
})
export class BorrowingsModule {}
