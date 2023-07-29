// cloudinary.provider.ts

import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      // cloud_name: process.env.CLOUDINARY_NAME,
      // api_key: process.env.CLOUDINARY_API_KEY,
      // api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: 'dj7btad71',
      api_key: '687677691434715',
      api_secret: 'vDkh1Ji_Sici4fkGxl-U7fiMCJ4',
    });
  },
};
