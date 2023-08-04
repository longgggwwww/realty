import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { DeletePropertyDto } from './dto/delete-property.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PropertiesService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    return this.prismaService.property.create({
      data: {
        name: createPropertyDto.name,
        description: createPropertyDto.description,
        icon: createPropertyDto.icon,
      },
    });
  }

  async findAll() {
    return await this.prismaService.property.findMany({
      include: {
        attrs: true,
        amenities: true,
        posts: true,
      },
    });
  }

  async findOne(id: string) {
    const property = await this.prismaService.property.findUnique({
      where: {
        id,
      },
      include: {
        attrs: true,
        amenities: true,
        posts: true,
      },
    });
    if (!property) {
      throw new NotFoundException();
    }

    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    return await this.prismaService.property.update({
      where: {
        id,
      },
      data: {
        name: updatePropertyDto.name,
        description: updatePropertyDto.description,
        icon: updatePropertyDto.icon,
      },
      include: {
        attrs: true,
        amenities: true,
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
    return await this.prismaService.property.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch(deletePropertyDto: DeletePropertyDto) {
    return await this.prismaService.property.deleteMany({
      where: {
        id: {
          in: deletePropertyDto.ids,
        },
      },
    });
  }
}
