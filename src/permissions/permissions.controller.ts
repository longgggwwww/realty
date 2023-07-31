import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permission: PermissionsService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permission.create(createPermissionDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.permission.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permission.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permission.update(id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permission.remove(id);
  }
}
