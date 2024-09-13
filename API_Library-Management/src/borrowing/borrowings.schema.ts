import { z, ZodType } from 'zod';

const memberIdSchema = z
  .string({
    required_error: 'Member ID is required',
    invalid_type_error: 'Member ID must be string',
  })
  .trim()
  .min(1, 'Member ID can not be blank');

const bookIDSchema = z
  .array(
    z
      .string({
        required_error: 'Book ID is required',
        invalid_type_error: 'Book ID must be a string',
      })
      .trim()
      .min(1, 'Book ID can not be blank'),
  )
  .nonempty('Books can not be empty');

export class BorrowingSchema {
  static readonly BorrowingBooksRequest: ZodType = z
    .object({
      member_id: memberIdSchema,
      books_id: bookIDSchema,
    })
    .required();
}

export class ReturningSchema {
  static readonly ReturningBooksRequest: ZodType = z
    .object({
      member_id: memberIdSchema,
      books_id: bookIDSchema,
    })
    .required();
}

export type BorrowingBooksRequest = z.infer<
  typeof BorrowingSchema.BorrowingBooksRequest
>;

export type ReturningBooksRequest = z.infer<
  typeof ReturningSchema.ReturningBooksRequest
>;
