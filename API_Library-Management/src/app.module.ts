import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { BooksModule } from './books/books.module';
import { BorrowingsModule } from './borrowing/borrowings.module';
import { PenaltiesModule } from './penalties/penalties.module';

@Module({
  imports: [BooksModule, BorrowingsModule, CommonModule, PenaltiesModule],
})
export class AppModule {}
