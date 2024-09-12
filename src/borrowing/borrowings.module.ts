import { Module } from '@nestjs/common';
import { BorrowingsRepository } from './borrowings.repository';
import { MemberModule } from 'src/members/members.module';
import { PenaltiesModule } from 'src/penalties/penalties.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [MemberModule, PenaltiesModule, BooksModule],
  providers: [BorrowingsRepository],
  exports: [BorrowingsRepository],
})
export class BorrowingsModule {}
