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
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { DeletePermissionGroupDto } from './dto/delete-permission-group.dto';

@Controller('permission-groups')
export class PermissionGroupsController {
  constructor(
    private readonly permissionGroupService: PermissionGroupsService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
    return this.permissionGroupService.create(createPermissionGroupDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.permissionGroupService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const group = await this.permissionGroupService.findOne(id);
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
    const group = await this.permissionGroupService.update(
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
    return this.permissionGroupService.removeBatch(deletePermissionsGroupDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionGroupService.remove(id);
  }
}
