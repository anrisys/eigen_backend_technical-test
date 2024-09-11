import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Books } from 'src/books/books.entity';
import { Members } from 'src/members/members.entity';
import { Penalties } from 'src/penalties/penalties.entity';

@Table
export class Borrowings extends Model {
  @Column
  borrowed_date: Date;

  @Column
  return_date: Date;

  @ForeignKey(() => Books)
  @Column
  book_id: string;

  @BelongsTo(() => Books)
  book: Books;

  @ForeignKey(() => Members)
  @Column
  member_id: string;

  @BelongsTo(() => Members)
  member: Members;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasOne(() => Penalties)
  penalty: Penalties;
}
