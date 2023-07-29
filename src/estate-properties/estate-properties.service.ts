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
        owners: {
          connect: createEstatePropertyDto.ownerIds.map((id) => ({
            id,
          })),
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
        owners: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.estateProperty.findUnique({
      where: {
        id,
      },
      include: {
        owners: true,
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
        owners: updateEstatePropertyDto.ownerIds
          ? {
              connect: updateEstatePropertyDto.ownerIds.map((id) => ({
                id,
              })),
            }
          : undefined,
        dataType: updateEstatePropertyDto.dataType,
        options: updateEstatePropertyDto.options,
        unit: updateEstatePropertyDto.unit,
        isFilterItem: updateEstatePropertyDto.isFilterItem,
        icon: updateEstatePropertyDto.icon,
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
