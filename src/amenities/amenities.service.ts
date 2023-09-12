import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { DeleteAmenityDto } from './dto/delete-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';

@Injectable()
export class AmenitiesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createAmenityDto: CreateAmenityDto) {
    return await this.prismaService.amenity.create({
      data: {
        key: createAmenityDto.key,
        name: createAmenityDto.name,
        description: createAmenityDto.description,
        icon: createAmenityDto.icon,
        properties: {
          connect: createAmenityDto.propertyIds.map((id) => ({ id })),
        },
      },
      include: {
        properties: true,
      },
    });
  }

  async findAll() {
    return await this.prismaService.amenity.findMany({
      include: {
        posts: true,
        properties: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.amenity.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        posts: true,
        properties: true,
      },
    });
  }

  async update(id: string, updateAmenityDto: UpdateAmenityDto) {
    return await this.prismaService.amenity.update({
      where: {
        id,
      },
      data: {
        key: updateAmenityDto.key,
        name: updateAmenityDto.name,
        description: updateAmenityDto.description,
        properties: updateAmenityDto.propertyIds
          ? {
              connect: updateAmenityDto.propertyIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        posts: true,
        properties: true,
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
    return await this.prismaService.amenity.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch(deleteAmenityDto: DeleteAmenityDto) {
    return await this.prismaService.amenity.deleteMany({
      where: {
        id: {
          in: deleteAmenityDto.ids,
        },
      },
    });
  }
}
