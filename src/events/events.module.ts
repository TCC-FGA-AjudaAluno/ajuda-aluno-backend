import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { AuthModule } from 'src/users/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [AuthModule, UsersModule, TypeOrmModule.forFeature([EventEntity])]
})
export class EventsModule {}
