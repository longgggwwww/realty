import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { DeleteAttributeDto } from './dto/delete-attribute.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AttributesService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createAttributeDto: CreateAttributeDto) {
    return await this.prismaService.attribute.create({
      data: {
        key: createAttributeDto.key,
        name: createAttributeDto.name,
        description: createAttributeDto.description,
        icon: createAttributeDto.icon,
        dataType: createAttributeDto.dataType,
        sym: createAttributeDto.sys,
        filterable: createAttributeDto.filterable,
        properties: {
          connect: createAttributeDto.propertyIds.map((id) => ({ id })),
        },
      },
      include: {
        properties: true,
      },
    });
  }

  async findAll() {
    return await this.prismaService.attribute.findMany({
      include: {
        properties: true,
        posts: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.attribute.findUnique({
      where: {
        id,
      },
      include: {
        properties: true,
        posts: true,
      },
    });
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto) {
    return await this.prismaService.attribute.update({
      where: {
        id,
      },
      data: {
        key: updateAttributeDto.key,
        name: updateAttributeDto.name,
        description: updateAttributeDto.description,
        icon: updateAttributeDto.icon,
        dataType: updateAttributeDto.dataType,
        sym: updateAttributeDto.sys,
        filterable: updateAttributeDto.filterable,
        properties: updateAttributeDto.propertyIds
          ? {
              connect: updateAttributeDto.propertyIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        properties: true,
        posts: true,
      },
    });
  }

  async upload(id: string, file: Express.Multer.File) {
    const uploadedFile = await this.cloudinaryService.uploadIcon(file);
    return await this.prismaService.property.update({
      where: {
        id,
      },
      data: {
        icon: uploadedFile.secure_url,
      },
      include: {
        attrs: true,
        amenities: true,
        posts: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.attribute.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch(deleteAttributeDto: DeleteAttributeDto) {
    return await this.prismaService.attribute.deleteMany({
      where: {
        id: {
          in: deleteAttributeDto.ids,
        },
      },
    });
  }
}
