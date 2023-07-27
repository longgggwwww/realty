import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstateTypesService } from './estate-types.service';
import { CreateEstateTypeDto } from './dto/create-estate-type.dto';
import { UpdateEstateTypeDto } from './dto/update-estate-type.dto';

@Controller('estate-types')
export class EstateTypesController {
  constructor(private readonly estateTypesService: EstateTypesService) {}

  @Post()
  create(@Body() createEstateTypeDto: CreateEstateTypeDto) {
    return this.estateTypesService.create(createEstateTypeDto);
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
    return this.estateTypesService.update(id, updateEstateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estateTypesService.remove(id);
  }
}
