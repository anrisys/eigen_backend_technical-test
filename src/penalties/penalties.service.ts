import { BadRequestException, Injectable } from '@nestjs/common';
import { PenaltiesRepository } from './penalties.repository';
import { MembersRepository } from 'src/members/members.repository';
import { BorrowingsRepository } from 'src/borrowing/borrowings.repository';

@Injectable()
export class PenaltiesService {
  constructor(
    private penaltiesRepository: PenaltiesRepository,
    private membersRepository: MembersRepository,
    private borrowingsRepository: BorrowingsRepository,
  ) {}

  async isPenaltyActive(memberCode: string): Promise<boolean> {
    const member = await this.membersRepository.findMemberByCode(memberCode);

    if (!member) {
      throw new BadRequestException('Member does not exist');
    }

    const memberBorrowing =
      await this.borrowingsRepository.findBorrowingRecordByMemberCode(
        memberCode,
      );

    if (!memberBorrowing) {
      // throw new BadRequestException(
      //   'This member has not borrowed any book yet',
      // );
      return false;
    }

    const memberPenalty = await this.penaltiesRepository.findLatestPenalty(
      memberBorrowing.id,
    );

    if (!memberPenalty) {
      return false;
    }

    return new Date() < memberPenalty.due_date;
  }
}
