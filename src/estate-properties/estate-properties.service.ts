import { Injectable } from '@nestjs/common';
import { CreateEstatePropertyDto } from './dto/create-estate-property.dto';
import { UpdateEstatePropertyDto } from './dto/update-estate-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstatePropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(createEstatePropertyDto: CreateEstatePropertyDto) {
    return await this.prisma.estateProperty.create({
      data: {
        key: createEstatePropertyDto.key,
        title: createEstatePropertyDto.title,
        owner: {
          connect: {
            id: createEstatePropertyDto.ownerId,
          },
        },
        dataType: createEstatePropertyDto.dataType,
        options: createEstatePropertyDto.options,
        unit: createEstatePropertyDto.unit,
        isFilterItem: createEstatePropertyDto.isFilterItem,
        icon: createEstatePropertyDto.icon,
      },
    });
  }

  async findAll() {
    return this.prisma.estateProperty.findMany({
      include: {
        owner: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.estateProperty.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
      },
    });
  }

  async update(id: string, updateEstatePropertyDto: UpdateEstatePropertyDto) {
    return this.prisma.estateProperty.update({
      where: {
        id,
      },
      data: {
        key: updateEstatePropertyDto.key,
        title: updateEstatePropertyDto.title,
        owner: {
          connect: {
            id: updateEstatePropertyDto.ownerId,
          },
        },
        dataType: updateEstatePropertyDto.dataType,
        options: updateEstatePropertyDto.options,
        unit: updateEstatePropertyDto.unit,
        isFilterItem: updateEstatePropertyDto.isFilterItem,
        icon: updateEstatePropertyDto.icon,
      },
      include: {
        owner: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.estateProperty.delete({
      where: {
        id,
      },
    });
  }
}
