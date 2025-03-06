import { Module } from '@nestjs/common';
import { SubjectsSeederService } from './subjects.service';

@Module({
  providers: [SubjectsSeederService],
  exports: [SubjectsSeederService]
})
export class SubjectsModule {}
