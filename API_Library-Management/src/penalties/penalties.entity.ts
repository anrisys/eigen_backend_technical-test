import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Borrowings } from 'src/borrowing/borrowings.entity';

@Table({ timestamps: false })
export class Penalties extends Model {
  @Column
  imposed_date: Date;

  @Column
  @CreatedAt
  due_date: Date;

  @ForeignKey(() => Borrowings)
  @Column
  borrowing_id: string;

  @BelongsTo(() => Borrowings)
  borrowing: Borrowings;
}
