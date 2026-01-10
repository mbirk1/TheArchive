import { Controller, Get, Inject } from '@nestjs/common';
import { PhotoService } from '../services/photo.service';
import { Card } from '../database/entities/card.entity';

@Controller('photos')
export class PhotoController {
  @Inject()
  private photoService: PhotoService;

  @Get()
  public async getPhotos(): Promise<Card[]> {
    return this.photoService.findAll();  }
}