import { Module } from '@nestjs/common';
import { MaterialsModule } from './materials/materials.module';

@Module({
  imports: [MaterialsModule]
})
export class SubjectsModule {}
