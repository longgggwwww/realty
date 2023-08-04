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
  UploadedFile,
  NotFoundException,
  ParseFilePipe,
} from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { DeleteAttributeDto } from './dto/delete-attribute.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributesService.create(createAttributeDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.attributesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributesService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('icon'))
  @Patch(':id/icon')
  upload(
    @Param('id') id: string,
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
  ) {
    return this.attributesService.upload(id, file);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributesService.update(id, updateAttributeDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('batch')
  removeBatch(@Body() deleteAttributeDto: DeleteAttributeDto) {
    return this.attributesService.removeBatch(deleteAttributeDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributesService.remove(id);
  }
}
