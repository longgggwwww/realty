import { Module } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { AmenitiesController } from './amenities.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [AmenitiesController],
  providers: [AmenitiesService, CloudinaryService],
})
export class AmenitiesModule {}
