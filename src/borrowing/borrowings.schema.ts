import { z, ZodType } from 'zod';

const memberIdSchema = z
  .string({
    required_error: 'Member code is required',
    invalid_type_error: 'Member code must be string',
  })
  .trim()
  .min(1, 'Member Code can not be blank');

const bookIDSchema = z
  .array(
    z.string({
      required_error: 'Book ID is required',
      invalid_type_error: 'Book ID must be a string',
    }),
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
