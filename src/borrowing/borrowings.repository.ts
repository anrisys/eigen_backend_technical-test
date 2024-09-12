import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Borrowings } from './borrowings.entity';

@Injectable()
export class BorrowingsRepository {
  constructor(
    @InjectModel(Borrowings) private borrowingsModel: typeof Borrowings,
  ) {}

  async create(
    member_code: string,
    book_code: string,
    transaction?: any,
  ): Promise<Borrowings> {
    return await this.borrowingsModel.create(
      {
        member_id: member_code,
        book_id: book_code,
      },
      { transaction },
    );
  }

  async findBorrowingRecordByMemberCode(
    memberCode: string,
  ): Promise<Borrowings> {
    return await this.borrowingsModel.findOne({
      where: { member_id: memberCode },
    });
  }

  async findBorrowingRecord(borrowringId: number): Promise<Borrowings> {
    return await this.borrowingsModel.findByPk(borrowringId);
  }

  async findUnreturnedBooksByMember(
    memberCode: string,
    bookCode: string,
  ): Promise<Borrowings> {
    const unreturnedBooks = await this.borrowingsModel.findOne({
      where: { member_id: memberCode, book_id: bookCode, return_date: null },
    });

    return unreturnedBooks;
  }

  async countUnreturnedBooksByMember(memberCode: string): Promise<number> {
    const borrowed_books = await this.borrowingsModel.findAndCountAll({
      where: { member_id: memberCode, return_date: null },
    });

    return borrowed_books.count;
  }

  async updateReturnDate(
    borrowedId: number,
    transaction: any,
  ): Promise<Borrowings> {
    const borrowingRecord = await this.findBorrowingRecord(borrowedId);

    if (!borrowingRecord) {
      throw new Error('Borrowing record not found');
    }

    const [affectedRow, [updatedBorrowing]] = await this.borrowingsModel.update(
      {
        return_date: new Date(),
      },
      { where: { id: borrowedId }, transaction, returning: true },
    );

    if (affectedRow === 0) {
      throw new Error('Failed to save the returning data');
    }

    return updatedBorrowing;
  }
}
