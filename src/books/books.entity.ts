import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Borrowings } from 'src/borrowing/borrowings.entity';

@Table
export class Books extends Model {
  @Column
  @PrimaryKey
  code: string;

  @Column
  title: string;

  @Column
  author: string;

  @Column
  stock: number;

  @HasMany(() => Borrowings)
  borrowings: Borrowings[];
}
