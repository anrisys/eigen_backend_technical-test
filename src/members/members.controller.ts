import { Controller, Get } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MemberController {
  constructor(private readonly membersService: MembersService) {}

  @Get('/check')
  async checkMembers() {
    const members = await this.membersService.getAllMembersWithBorrowedBooks();
    return members;
  }
}
