import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Public } from '@auth/guards/jwt-auth.guard';

@Public()
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', { ...new UploadService().getMulterConfig() })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = `uploads/${file.filename}`;
    return { url: fileUrl };
  }
}
