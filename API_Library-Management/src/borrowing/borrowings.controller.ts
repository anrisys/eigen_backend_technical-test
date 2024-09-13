import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import {
  BorrowingSchema,
  BorrowingBooksRequest,
  ReturningSchema,
  ReturningBooksRequest,
} from './borrowings.schema';
import { ZodValidationPipe } from 'src/common/validation.pipe';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('borrowings')
@Controller('borrowings')
export class BorrowingsController {
  constructor(private borrowingsService: BorrowingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Borrow books',
    description:
      'Allows a member to borrow books by providing member ID and book IDs.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Books successfully borrowed.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Bad request when input is invalid or member has an active penalty.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        member_id: { type: 'string', example: '12345' },
        books_id: {
          type: 'array',
          items: { type: 'string', example: 'book_1' },
        },
      },
    },
  })
  @UsePipes(new ZodValidationPipe(BorrowingSchema.BorrowingBooksRequest))
  async createBorrowingBooks(@Body() request: BorrowingBooksRequest) {
    const result: boolean =
      await this.borrowingsService.borrowingBooks(request);

    if (result) {
      return {
        message: 'Successfully borrowing books',
      };
    }
  }

  @Post('/return-books')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Returns borrowed books',
    description:
      'Allows a member to return borrowed books by providing member ID and book IDs.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Member successfully returns books',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Bad request when input is invalid or member has an active penalty.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        member_id: { type: 'string', example: '12345' },
        books_id: {
          type: 'array',
          items: { type: 'string', example: 'book_1' },
        },
      },
    },
  })
  @UsePipes(new ZodValidationPipe(ReturningSchema.ReturningBooksRequest))
  async returnBorrowedBooks(@Body() request: ReturningBooksRequest) {
    const result = await this.borrowingsService.returningBooks(request);

    if (result) {
      return {
        message: 'Successfully returning books',
      };
    }
  }
}
