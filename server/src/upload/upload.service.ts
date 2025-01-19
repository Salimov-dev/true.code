import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlink } from 'fs';

@Injectable()
export class UploadService {
  getMulterConfig() {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new Error('Только изображения (jpg, jpeg, png, gif)!'),
            false
          );
        }
        callback(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    };
  }

  async deleteFile(fileUrl: string) {
    return new Promise((resolve, reject) => {
      unlink(fileUrl, (err) => {
        if (err) {
          reject(new Error('Ошибка при удалении файла.'));
        } else {
          resolve({ fileUrl, message: 'Файл удален успешно.' });
        }
      });
    });
  }
}
