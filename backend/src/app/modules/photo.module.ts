import { Module } from '@nestjs/common';
import { PhotoService } from '../services/photo.service';
import { PhotoController } from '../controller/photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../database/entities/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card])
  ],
  providers: [
    PhotoService,
  ],
  controllers: [PhotoController],
})
export class PhotoModule {}
