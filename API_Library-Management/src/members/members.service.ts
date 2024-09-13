import { Injectable } from '@nestjs/common';
import { MembersRepository } from './members.repository';

@Injectable()
export class MembersService {
  constructor(private membersRepository: MembersRepository) {}

  async getAllMembersWithBorrowedBooks() {
    return await this.membersRepository.findAllMembersWithBorrowedCount();
  }
}
