import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionGroupsService } from './permission-groups.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { DeletePermissionGroupsDto } from './dto/delete-permission-group.dto';

@Controller('permission-groups')
export class PermissionGroupsController {
  constructor(private readonly permGroup: PermissionGroupsService) {}

  @Post()
  create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
    return this.permGroup.create(createPermissionGroupDto);
  }

  @Get()
  findAll() {
    return this.permGroup.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permGroup.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionGroupDto: UpdatePermissionGroupDto,
  ) {
    return this.permGroup.update(id, updatePermissionGroupDto);
  }

  @Delete('batch')
  removeBatch(@Body() deletePermissionsGroupDto: DeletePermissionGroupsDto) {
    return this.permGroup.removeBatch(deletePermissionsGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permGroup.remove(id);
  }
}
