import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEstateTypeDto } from './dto/create-estate-type.dto';
import { UpdateEstateTypeDto } from './dto/update-estate-type.dto';
import { RemoveEstateTypeDto } from './dto/remove-estate-type.dto';

@Injectable()
export class EstateTypesService {
  constructor(private prisma: PrismaService) {}

  create(createEstateTypeDto: CreateEstateTypeDto) {
    try {
      return this.prisma.estateType.create({
        data: createEstateTypeDto,
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  findAll() {
    return this.prisma.estateType.findMany({
      include: {
        posts: true,
        utils: true,
        properties: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.estateType.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
        utils: true,
        properties: true,
      },
    });
  }

  async update(id: string, updateEstateTypeDto: UpdateEstateTypeDto) {
    try {
      return await this.prisma.estateType.update({
        where: {
          id,
        },
        data: updateEstateTypeDto,
        include: {
          posts: true,
          utils: true,
          properties: true,
        },
      });
    } catch (err) {
      return null;
    }
  }

  remove(id: string) {
    return this.prisma.estateType.delete({
      where: {
        id,
      },
    });
  }

  removeBatch(removeEstateTypeDto: RemoveEstateTypeDto) {
    return this.prisma.estateType.deleteMany({
      where: {
        id: {
          in: removeEstateTypeDto.ids,
        },
      },
    });
  }
}
