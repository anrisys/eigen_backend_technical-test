import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Borrowings } from 'src/borrowing/borrowings.entity';

@Table
export class Members extends Model {
  @Column
  @PrimaryKey
  code: string;

  @Column
  name: string;

  @HasMany(() => Borrowings)
  borrowings: Borrowings[];
}
