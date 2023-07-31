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
  BadRequestException,
} from '@nestjs/common';
import { EstateTypesService } from './estate-types.service';
import { CreateEstateTypeDto } from './dto/create-estate-type.dto';
import { UpdateEstateTypeDto } from './dto/update-estate-type.dto';
import { RemoveEstateTypeDto } from './dto/remove-estate-type.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('estate-types')
export class EstateTypesController {
  constructor(
    private readonly estateTypesService: EstateTypesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(@Body() createEstateTypeDto: CreateEstateTypeDto) {
    const estateType = this.estateTypesService.create(createEstateTypeDto);
    if (!estateType) {
      throw new BadRequestException('Thao tác thất bại');
    }

    return estateType;
  }

  @Get()
  findAll() {
    return this.estateTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estateTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstateTypeDto: UpdateEstateTypeDto,
  ) {
    const estateType = this.estateTypesService.update(id, updateEstateTypeDto);
    if (!estateType) {
      throw new BadRequestException('Upload icon thất bại');
    }
    return estateType;
  }

  // Upload icon
  @Patch(':id/icon')
  @UseInterceptors(FileInterceptor('image'))
  async uploadIcon(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    // Upload icon lên cloudinary
    const icon = await this.cloudinaryService.uploadIcon(image);
    if (!icon) {
      throw new BadRequestException('Upload icon thất bại');
    }

    // Cập nhật url icon đã upload
    const estateType = await this.estateTypesService.update(id, {
      icon: icon.secure_url,
    });
    if (!estateType) {
      console.log('go here');
      // rollback icon
      // this.cloudinary.removeAsset(icon.public_id);

      throw new BadRequestException('Thao tác thất bại');
    }

    return estateType;
  }

  // Xóa nhiều document
  @Delete('batch')
  removeBatch(@Body() removeEstateTypeDto: RemoveEstateTypeDto) {
    return this.estateTypesService.removeBatch(removeEstateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estateTypesService.remove(id);
  }
}
