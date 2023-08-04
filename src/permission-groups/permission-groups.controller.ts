import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PermissionGroupsService } from './permission-groups.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { DeletePermissionGroupDto } from './dto/delete-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';

@Controller('permission-groups')
export class PermissionGroupsController {
  constructor(
    private readonly permissionGroupsService: PermissionGroupsService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
    return this.permissionGroupsService.create(createPermissionGroupDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.permissionGroupsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const group = await this.permissionGroupsService.findOne(id);
    if (!group) {
      throw new NotFoundException();
    }

    return group;
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionGroupDto: UpdatePermissionGroupDto,
  ) {
    const group = await this.permissionGroupsService.update(
      id,
      updatePermissionGroupDto,
    );
    if (!group) {
      throw new BadGatewayException();
    }

    return group;
  }

  @HttpCode(HttpStatus.OK)
  @Delete('batch')
  removeBatch(@Body() deletePermissionsGroupDto: DeletePermissionGroupDto) {
    return this.permissionGroupsService.removeBatch(deletePermissionsGroupDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionGroupsService.remove(id);
  }
}
