import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Books } from 'src/books/books.entity';
import { Borrowings } from 'src/borrowing/borrowings.entity';
import { Members } from 'src/members/members.entity';
import { Penalties } from 'src/penalties/penalties.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_DEVELOPMENT,
      models: [Books, Borrowings, Members, Penalties],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  providers: [],
})
export class CommonModule {}
