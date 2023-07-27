import { Injectable } from '@nestjs/common';
import { CreateEstateTypeDto } from './dto/create-estate-type.dto';
import { UpdateEstateTypeDto } from './dto/update-estate-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstateTypesService {
  constructor(private prisma: PrismaService) {}

  async create(createEstateTypeDto: CreateEstateTypeDto) {
    return await this.prisma.category.create({
      data: {
        label: createEstateTypeDto.label,
        icon: createEstateTypeDto.icon,
      },
    });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateEstateTypeDto: UpdateEstateTypeDto) {
    return `This action updates a #${id} estateType`;
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
