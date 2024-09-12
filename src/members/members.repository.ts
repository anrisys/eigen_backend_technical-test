import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Members } from './members.entity';
import { Borrowings } from 'src/borrowing/borrowings.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MembersRepository {
  constructor(
    @InjectModel(Members) private memberModel: typeof Members,
    @InjectModel(Borrowings) private borrowingsModel: typeof Borrowings,
    private sequelize: Sequelize,
  ) {}

  async findMemberByCode(memberCode: string): Promise<Members> {
    const member = await this.memberModel.findOne({
      where: { code: memberCode },
    });

    return member;
  }

  async findAllMembersWithBorrowedCount() {
    const members = await this.memberModel.findAll({
      include: [
        {
          model: Borrowings,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            this.sequelize.fn(
              'COUNT',
              this.sequelize.col('borrowings.book_id'),
            ),
            'borrowedCount',
          ],
        ],
      },
      group: ['Member.code'],
    });
    return members;
  }

  async currentlyBorrowedBooksByAMember(memberCode: string): Promise<number> {
    const borrowed_books = await this.borrowingsModel.findAndCountAll({
      where: { member_id: memberCode },
    });

    return borrowed_books.count;
  }

  async findAllMembers(): Promise<Members[]> {
    return await this.memberModel.findAll();
  }
}
