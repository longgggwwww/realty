import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    console.log(createPostDto, createPostDto.thumbnail);
    return await this.prisma.post.create({
      data: {
        title: createPostDto.title,
        estateType: {
          connect: {
            id: createPostDto.estateTypeId,
          },
        },
        thumbnail: createPostDto.thumbnail,
        images: createPostDto.images,
        author: {
          connect: {
            id: userId,
          },
        },
        properties: {
          connect: createPostDto.propertieIds.map((id) => ({ id })),
        },
        status: createPostDto.status,
        address: createPostDto.address,
        price: createPostDto.price,
        saleType: createPostDto.saleType,
      },
    });
  }

  async findAll() {
    return await this.prisma.post.findMany({
      include: {
        author: true,
        estateType: true,
        properties: true,
        savedBy: true,
        utils: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        estateType: true,
        properties: true,
        savedBy: true,
        utils: true,
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
