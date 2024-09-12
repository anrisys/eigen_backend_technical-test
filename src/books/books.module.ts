import { Module } from '@nestjs/common';
import { BooksRepository } from './books.repository';

@Module({
  imports: [],
  providers: [BooksRepository],
  exports: [BooksRepository],
})
export class BooksModule {}
