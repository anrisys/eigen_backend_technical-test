import { Controller, Get, HttpStatus } from '@nestjs/common';
import { MembersService } from './members.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('members')
@Controller('members')
export class MemberController {
  constructor(private readonly membersService: MembersService) {}

  @Get('/check')
  @ApiOperation({
    summary: 'Checks members',
    description:
      'Allows for checking all members data and their current borrowed books',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully gets all members data',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'There is a problem. Please try again later',
  })
  async checkMembers() {
    const members = await this.membersService.getAllMembersWithBorrowedBooks();
    return members;
  }
}
