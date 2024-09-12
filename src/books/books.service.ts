import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Books } from './books.entity';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  async getAllReadyBooks(): Promise<Books[]> {
    return await this.booksRepository.findAllReadyBooks();
  }
}
