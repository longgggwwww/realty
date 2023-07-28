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
    private readonly estatePropertiesService: EstatePropertiesService,
    private readonly firebase: FirebaseService,
    private readonly ggdrive: GgdriveService,
  ) {}

  @Post()
  create(@Body() createEstatePropertyDto: CreateEstatePropertyDto) {
    return this.estatePropertiesService.create(createEstatePropertyDto);
  }

  @Get()
  findAll() {
    return this.estatePropertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estatePropertiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstatePropertyDto: UpdateEstatePropertyDto,
  ) {
    return this.estatePropertiesService.update(+id, updateEstatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estatePropertiesService.remove(+id);
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
