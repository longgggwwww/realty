import { Injectable, Ip } from '@nestjs/common';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { PrismaService } from 'nestjs-prisma';
import { DeleteAmenityDto } from './dto/delete-amenity.dto';

@Injectable()
export class AmenitiesService {
  constructor(private prismaService: PrismaService) {}

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
    return await this.prismaService.amenity.findUnique({
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
