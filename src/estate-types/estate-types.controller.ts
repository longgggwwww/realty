import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { EstateTypesService } from './estate-types.service';
import { CreateEstateTypeDto } from './dto/create-estate-type.dto';
import { UpdateEstateTypeDto } from './dto/update-estate-type.dto';
import { Public } from 'src/auth/decorators/public.decorator';

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
  async findOne(@Param('id') id: string) {
    try {
      const type = await this.estateTypesService.findOne(id);
      if (!type) {
        throw new NotFoundException('Không tìm thấy loại hình bất động sản');
      }

      return type;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEstateTypeDto: UpdateEstateTypeDto,
  ) {
    try {
      await this.estateTypesService.update(id, updateEstateTypeDto);
      return 'Cập nhật loại hình bds thành công';
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.estateTypesService.remove(id);
    return 'Xóa loại hình bds thành công';
  }
}
