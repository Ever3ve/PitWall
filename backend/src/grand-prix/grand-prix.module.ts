import { Module } from '@nestjs/common';
import { GrandPrix } from './grand-prix.entity';
import { GrandPrixController } from './grand-prix.controller';
import { GrandPrixService } from './grand-prix.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GrandPrix])],
  controllers: [GrandPrixController],
  providers: [GrandPrixService],
})
export class GrandPrixModule {}
