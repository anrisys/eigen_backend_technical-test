import { BadRequestException, Injectable } from '@nestjs/common';
import { MembersRepository } from 'src/members/members.repository';
import { BorrowingsRepository } from './borrowings.repository';
import { PenaltiesService } from 'src/penalties/penalties.service';
import { BooksRepository } from 'src/books/books.repository';
import { Sequelize } from 'sequelize-typescript';
import {
  BorrowingBooksRequest,
  ReturningBooksRequest,
} from './borrowings.schema';
import { PenaltiesRepository } from 'src/penalties/penalties.repository';

@Injectable()
export class BorrowingsService {
  constructor(
    private borrowingsRepository: BorrowingsRepository,
    private membersRepository: MembersRepository,
    private penaltiesServices: PenaltiesService,
    private booksRepository: BooksRepository,
    private sequelize: Sequelize,
    private penaltiesRepository: PenaltiesRepository,
  ) {}

  async create(request: BorrowingBooksRequest): Promise<boolean> {
    const member = await this.membersRepository.findMemberByCode(
      request.member_id,
    );

    if (!member) {
      throw new BadRequestException('Member does not exist');
    }

    const isMemberInPenalty = await this.penaltiesServices.isPenaltyActive(
      request.member_id,
    );

    if (isMemberInPenalty) {
      throw new BadRequestException('Member has active penalty!');
    }

    const currentBorrowedBooks =
      await this.borrowingsRepository.countUnreturnedBooksByMember(
        request.member_id,
      );

    if (currentBorrowedBooks >= 2) {
      throw new BadRequestException('Member has already borrowed two books');
    }

    const transaction = await this.sequelize.transaction();

    try {
      for (const bood_id of request.books_id) {
        const book = await this.booksRepository.findOne(bood_id);

        if (!book) {
          throw new BadRequestException(`Book with ID ${bood_id} not found`);
        }

        if (book.stock <= 0) {
          throw new BadRequestException(
            `Book with ID ${bood_id} is out of stock`,
          );
        }

        const borrowingRecord = await this.borrowingsRepository.create(
          request.member_id,
          bood_id,
          transaction,
        );
        if (!borrowingRecord.id) {
          throw Error('Failed to record the borrowings');
        }

        await this.booksRepository.updateStock(bood_id, -1, transaction);
      }

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async returningBooks(request: ReturningBooksRequest) {
    const member = await this.membersRepository.findMemberByCode(
      request.member_id,
    );

    if (!member) {
      throw new BadRequestException('Member does not exist');
    }

    const numberOfBorrowedBooks =
      await this.borrowingsRepository.countUnreturnedBooksByMember(
        request.member_id,
      );

    if (numberOfBorrowedBooks === 0) {
      throw new BadRequestException('User does not borrow any book currently');
    }

    for (const book_id of request.books_id) {
      const currentBorrowedBooks =
        await this.borrowingsRepository.findUnreturnedBooksByMember(
          request.member_id,
          book_id,
        );

      if (!currentBorrowedBooks) {
        throw new BadRequestException(
          `Book with ID ${book_id} is not borrowed by member with ID ${request.member_id}`,
        );
      }

      const transaction = await this.sequelize.transaction();
      try {
        const isBookReturnLate = this.isBookReturnLate(
          currentBorrowedBooks.borrowed_date,
        );

        await this.borrowingsRepository.updateReturnDate(
          currentBorrowedBooks.id,
          transaction,
        );

        if (isBookReturnLate) {
          await this.penaltiesRepository.create(currentBorrowedBooks.id);
        }

        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    }

    return true;
  }

  isBookReturnLate(borrowedDate: Date): boolean {
    const sevenDaysLater = new Date(borrowedDate);
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
    return new Date() >= sevenDaysLater;
  }
}
