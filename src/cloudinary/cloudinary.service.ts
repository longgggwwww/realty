import { Injectable } from '@nestjs/common';
import * as streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';

@Injectable()
export class CloudinaryService {
  uploadIcon(
    file: Express.Multer.File,
    path: string = '',
  ): Promise<CloudinaryResponse> {
    console.log('path here:', file, path);
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: path,
          overwrite: true,
        },
        (err, res) => {
          if (err) {
            return reject(err);
          }

          resolve(res);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  removeAsset(publicId: string) {
    return new Promise((resolve, rejects) => {
      cloudinary.uploader.destroy(publicId, (err, res) => {
        if (err) {
          return rejects(err);
        }

        resolve(res);
      });
    });
  }
}
