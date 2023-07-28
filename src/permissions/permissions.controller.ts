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
import { CreateGroupDto } from './dto/group/create-group.dto';
import { UpdateGroupDto } from './dto/group/update-group.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('group')
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.permissionsService.createGroup(createGroupDto);
  }

  @Get('group')
  findAllGroup() {
    return this.permissionsService.findAllGroup();
  }

  @Get('group/:id')
  findOneGroup(@Param('id') id: string) {
    return this.permissionsService.findOneGroup(id);
  }

  @Patch('group/:id')
  updateGroup(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.permissionsService.updateGroup(id, updateGroupDto);
  }

  @Delete('group/:id')
  removeGroup(@Param('id') id: string) {
    return this.permissionsService.removeGroup(id);
  }

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
