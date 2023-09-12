import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory(configService: ConfigService) {
    return cloudinary.url(configService.get('cloud.cloudinary.url'));
  },
  inject: [ConfigService],
};
