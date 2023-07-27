import { Injectable } from '@nestjs/common';
import { drive_v3, google } from 'googleapis';
import fs from 'fs';
import { ThreadMemberFlagsBitField } from 'discord.js';
import { Readable } from 'stream';

const CLIENT_ID =
  '434672592707-qlo0po93991c9os62qnfe29stunseudr.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04VQ-Y2wLJs4KCgYIARAAGAQSNwF-L9IrdlNf1J5mOXK1ksSz-PmL3hd1LQ0gAVjcnQet0FkveWSX_Tttf8gnE42s0gvqdEFjwAU';

@Injectable()
export class GgdriveService {
  private drive: drive_v3.Drive;

  constructor() {
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI,
    );
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    this.drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    });
  }

  getDrive() {
    return this.drive;
  }

  async checkFolderExists(folderName: string) {
    try {
      // Sử dụng phương thức 'list' để liệt kê các tệp và thư mục trong Google Drive.
      const response = await this.drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
        fields: 'files(id, name)',
      });

      // Kiểm tra xem có thư mục nào trùng khớp với tên 'folderName' hay không.
      if (response.data.files.length > 0) {
        console.log(`Thư mục "${folderName}" đã tồn tại.`);
        return true;
      } else {
        console.log(`Thư mục "${folderName}" không tồn tại.`);
        return false;
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi kiểm tra thư mục:', error.message);
      return false;
    }
  }

  async createFolder(folder: string) {
    const res = await this.drive.files.create({
      fields: 'id',
      requestBody: {
        name: folder,
        mimeType: 'application/vnd.google-apps.folder',
      },
    });

    return res.data.id;
  }

  async uploadImageBuffer(file: Express.Multer.File, folderId: string) {
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);

    await this.drive.files.create({
      fields: 'id',
      requestBody: {
        parents: [folderId],
        name: file.originalname,
        mimeType: file.mimetype,
      },
      media: {
        mimeType: file.mimetype,
        body: bufferStream,
      },
    });
    return 'Upload thành công';
  }
}
