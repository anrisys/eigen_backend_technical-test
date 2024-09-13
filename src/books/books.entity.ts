import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Borrowings } from 'src/borrowing/borrowings.entity';

@Table({ timestamps: false })
export class Books extends Model {
  @PrimaryKey
  @Column
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
