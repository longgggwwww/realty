import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { DeletePropertyDto } from './dto/delete-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
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
        amenities: true,
        posts: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.property.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        amenities: true,
        posts: true,
      },
    });
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
