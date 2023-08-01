import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadGatewayException,
} from '@nestjs/common';
import { EstateUtilsService } from './estate-utils.service';
import { CreateEstateUtilDto } from './dto/create-estate-util.dto';
import { UpdateEstateUtilDto } from './dto/update-estate-util.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('estate-utils')
export class EstateUtilsController {
  constructor(
    private readonly estateUtilsService: EstateUtilsService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @Post()
  create(@Body() createEstateUtilDto: CreateEstateUtilDto) {
    return this.estateUtilsService.create(createEstateUtilDto);
  }

  @Get()
  findAll() {
    return this.estateUtilsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estateUtilsService.findOne(id);
  }

  @Patch('upload/:id')
  @UseInterceptors(FileInterceptor('icon'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const uploadedFile = await this.cloudinary.uploadIcon(file);

      await this.estateUtilsService.update(id, {
        icon: uploadedFile.secure_url,
      });

      return 'Upload file thành công';
    } catch (err) {
      console.log(err);
      throw new BadGatewayException(err);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstateUtilDto: UpdateEstateUtilDto,
  ) {
    return this.estateUtilsService.update(id, updateEstateUtilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estateUtilsService.remove(id);
  }
}
