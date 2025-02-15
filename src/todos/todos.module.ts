import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { AuthModule } from 'src/users/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todos.entity';

@Module({
  providers: [TodosService],
  controllers: [TodosController],
  imports: [AuthModule, UsersModule, TypeOrmModule.forFeature([Todo])]
})
export class TodosModule {}
