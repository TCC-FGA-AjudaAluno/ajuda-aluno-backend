import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MaterialsModule } from './materials/materials.module';
import { SubjectsController } from './subjects.controller';
import { Subject } from './entities/subjects.entity';
import { SubjectsService } from './subjects.service';
import { Enrollment } from './entities/enrollment.entity';

@Module({
  imports: [MaterialsModule, TypeOrmModule.forFeature([Subject, Enrollment]), UsersModule],
  controllers: [SubjectsController],
  providers: [SubjectsService]
})
export class SubjectsModule {}
