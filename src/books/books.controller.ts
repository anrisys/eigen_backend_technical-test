import { Controller, Get, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  @ApiOperation({
    summary: 'Checks books',
    description:
      'Allows for checking all available books to be borrowed by members',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully gets all available books',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'There is a problem. Please try again later',
  })
  async getAllReadyBooks() {
    return await this.booksService.getAllReadyBooks();
  }
}
