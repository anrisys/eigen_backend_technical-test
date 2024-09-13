import { Module } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Books } from './books.entity';
import { BooksService } from './books.service';

@Module({
  imports: [SequelizeModule.forFeature([Books])],
  controllers: [BooksController],
  providers: [BooksRepository, BooksService],
  exports: [BooksRepository],
})
export class BooksModule {}
