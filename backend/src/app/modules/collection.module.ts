import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Collection } from '../database/entities/collection.entity';
import { CollectionService } from '../services/collection.service';
import { CollectionController } from '../controller/collection.controller';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collection]), HttpModule, UserModule],
  providers: [CollectionService],
  controllers: [CollectionController],
})
export class CollectionModule {}
