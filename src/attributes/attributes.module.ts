import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [AttributesController],
  providers: [AttributesService, CloudinaryService],
})
export class AttributesModule {}
