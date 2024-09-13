import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Borrowings } from 'src/borrowing/borrowings.entity';

@Table({ timestamps: false })
export class Members extends Model {
  @PrimaryKey
  @Column
  code: string;

  @Column
  name: string;

  @HasMany(() => Borrowings)
  borrowings: Borrowings[];
}
