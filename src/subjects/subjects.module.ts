import { Module } from '@nestjs/common';
import { MaterialsModule } from './materials/materials.module';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subjects.entity';
import { SubjectsService } from './subjects.service';
import { AuthModule } from 'src/users/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MaterialsModule, TypeOrmModule.forFeature([Subject]), UsersModule],
  controllers: [SubjectsController],
  providers: [SubjectsService]
})
export class SubjectsModule {}
