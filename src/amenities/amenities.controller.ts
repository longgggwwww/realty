import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  BadRequestException,
  ParseFilePipe,
  UploadedFile,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AmenitiesService } from './amenities.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { DeleteAmenityDto } from './dto/delete-amenity.dto';

@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createAmenityDto: CreateAmenityDto) {
    return this.amenitiesService.create(createAmenityDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.amenitiesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.amenitiesService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('icon'))
  @Patch(':id/icon')
  upload(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): any {
    return this.amenitiesService.upload(id, file);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmenityDto: UpdateAmenityDto) {
    return this.amenitiesService.update(id, updateAmenityDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('batch')
  removeBatch(@Body() deleteAmenityDto: DeleteAmenityDto) {
    return this.amenitiesService.removeBatch(deleteAmenityDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amenitiesService.remove(id);
  }
}
