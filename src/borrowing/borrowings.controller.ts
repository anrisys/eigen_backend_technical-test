import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import {
  BorrowingSchema,
  BorrowingBooksRequest,
  ReturningSchema,
  ReturningBooksRequest,
} from './borrowings.schema';
import { ZodValidationPipe } from 'src/common/validation.pipe';

@Controller('/borrows')
export class BorrowingsController {
  constructor(private borrowingsService: BorrowingsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(BorrowingSchema.BorrowingBooksRequest))
  async createBorrowingBooks(@Body() request: BorrowingBooksRequest) {
    const result: boolean = await this.borrowingsService.create(request);

    if (result) {
      return {
        message: 'Successfully borrowing books',
      };
    }
  }

  @Post('/return-books')
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
