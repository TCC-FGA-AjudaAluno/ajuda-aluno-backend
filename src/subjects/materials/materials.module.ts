import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { AuthModule } from 'src/users/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './materials.entity';

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService],
  imports: [AuthModule, TypeOrmModule.forFeature([Material])]
})
export class MaterialsModule {}
