import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { EstatePropertiesService } from './estate-properties.service';
import { CreateEstatePropertyDto } from './dto/create-estate-property.dto';
import { UpdateEstatePropertyDto } from './dto/update-estate-property.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from 'src/firebase/firebase.service';
import { GgdriveService } from 'src/ggdrive/ggdrive.service';

@Controller('estate-properties')
export class EstatePropertiesController {
  constructor(
    private readonly estateProperties: EstatePropertiesService,
    private readonly ggdrive: GgdriveService,
  ) {}

  @Post()
  create(@Body() createEstatePropertyDto: CreateEstatePropertyDto) {
    return this.estateProperties.create(createEstatePropertyDto);
  }

  @Get()
  findAll() {
    return this.estateProperties.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estateProperties.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstatePropertyDto: UpdateEstatePropertyDto,
  ) {
    return this.estateProperties.update(id, updateEstatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estateProperties.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      // Kiêm tra thư mục tồn tại hay không?
      const val = await this.ggdrive.checkFolderExists('hello-cc');
      return val;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }
}
