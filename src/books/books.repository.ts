import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Books } from './books.entity';
import { Op } from 'sequelize';

@Injectable()
export class BooksRepository {
  constructor(@InjectModel(Books) private booksModel: typeof Books) {}

  async findOne(bookCode: string): Promise<Books> {
    return await this.booksModel.findByPk(bookCode);
  }

  async updateStock(
    bookCode: string,
    changes: number,
    transaction?: any,
  ): Promise<void> {
    const book = await this.findOne(bookCode);

    if (!book) {
      throw new Error('Book not found');
    }

    const updatedStock = book.stock + changes;

    await this.booksModel.update(
      { stock: updatedStock },
      { where: { code: bookCode }, returning: true, transaction },
    );
  }

  async findAllReadyBooks(): Promise<Books[]> {
    return await this.booksModel.findAll({ where: { stock: { [Op.gt]: 0 } } });
  }
}
