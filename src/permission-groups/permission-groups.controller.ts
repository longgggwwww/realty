import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { DeletePermissionGroupDto } from './dto/delete-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { PermissionGroupsService } from './permission-groups.service';

@Controller('permission-groups')
export class PermissionGroupsController {
  constructor(
    private readonly permissionGroupsService: PermissionGroupsService,
  ) {}

  @Post()
  create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
    return this.permissionGroupsService.create(createPermissionGroupDto);
  }

  @Get()
  findAll() {
    return this.permissionGroupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionGroupsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionGroupDto: UpdatePermissionGroupDto,
  ) {
    return await this.permissionGroupsService.update(
      id,
      updatePermissionGroupDto,
    );
  }

  @Delete('batch')
  removeBatch(@Body() deletePermissionsGroupDto: DeletePermissionGroupDto) {
    return this.permissionGroupsService.removeBatch(deletePermissionsGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionGroupsService.remove(id);
  }
}
