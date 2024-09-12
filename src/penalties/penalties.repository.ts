import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Penalties } from './penalties.entity';

@Injectable()
export class PenaltiesRepository {
  constructor(@InjectModel(Penalties) private penaltyModel: typeof Penalties) {}

  async create(borrowingId: number): Promise<Penalties> {
    const imposed_date = new Date();
    const due_date = imposed_date.setDate(imposed_date.getDate() + 3);
    return await this.penaltyModel.create({
      imposed_date,
      due_date,
      borrowing_id: borrowingId,
    });
  }

  async findLatestPenalty(borrowing_id: string): Promise<Penalties> {
    return await this.penaltyModel.findOne({ where: { borrowing_id } });
  }
}
