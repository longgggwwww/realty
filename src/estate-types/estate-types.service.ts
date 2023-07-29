import { Injectable } from '@nestjs/common';
import { CreateEstateTypeDto } from './dto/create-estate-type.dto';
import { UpdateEstateTypeDto } from './dto/update-estate-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstateTypesService {
  constructor(private prisma: PrismaService) {}

  async create(createEstateTypeDto: CreateEstateTypeDto) {
    return await this.prisma.estateType.create({
      data: {
        label: createEstateTypeDto.label,
        icon: createEstateTypeDto.icon,
      },
    });
  }

  async findAll() {
    return await this.prisma.estateType.findMany({
      include: {
        properties: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.estateType.findUnique({
      where: {
        id,
      },
      include: {
        properties: true,
      },
    });
  }

  async update(id: string, updateEstateTypeDto: UpdateEstateTypeDto) {
    await this.prisma.estateType.update({
      where: {
        id,
      },
      data: {
        label: updateEstateTypeDto.label,
        icon: updateEstateTypeDto.icon,
      },
    });

    return `This action updates a #${id} estateType`;
  }

  remove(id: string) {
    return this.prisma.estateType.delete({
      where: {
        id,
      },
    });
  }
}
