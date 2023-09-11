import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostStatus } from './enum/status-post.enum';
import { DeletePostDto } from './dto/delete-post.dto';
import { ChangePostStatusDto } from './dto/change-post-status.dto';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    return await this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        mode: createPostDto.mode,
        price: createPostDto.price,
        thumbnail: createPostDto.thumbnail,
        images: createPostDto.images,
        author: {
          connect: {
            id: userId,
          },
        },
        property: {
          connect: {
            id: createPostDto.propertyId,
          },
        },
        attrs: createPostDto.attrIds
          ? {
              connect: createPostDto.attrIds.map((id) => ({ id })),
            }
          : undefined,
        amenities: createPostDto.amenityIds
          ? {
              connect: createPostDto.amenityIds.map((id) => ({ id })),
            }
          : undefined,
        status: PostStatus.pending,
        address: {
          detail: createPostDto.address.detail,
          provinceId: createPostDto.address.provinceId,
          districtId: createPostDto.address.districtId,
          wardId: createPostDto.address.wardId,
        },
        area: createPostDto.area,
        depositCharge: createPostDto.depositCharge,
        electricityFee: createPostDto.electricityFee,
        waterFee: createPostDto.waterFee,
      },
      include: {
        author: true,
        property: true,
        attrs: true,
        amenities: true,
      },
    });
  }

  async findAll(queryDto: QueryDto) {
    return await this.prismaService.post.findMany({
      where: {
        title: queryDto.title
          ? {
              contains: queryDto.title,
              mode: 'insensitive',
            }
          : undefined,
        property: queryDto.propertyIds
          ? {
              id: {
                in: queryDto.propertyIds,
              },
            }
          : undefined,
        amenities: queryDto.amenityIds
          ? {
              some: {
                id: {
                  in: queryDto.amenityIds,
                },
              },
            }
          : undefined,
        price: {
          gte: queryDto.minPrice,
          lte: queryDto.maxPrice,
        },
      },
      skip: queryDto.cursor ? 1 : undefined,
      cursor: queryDto.cursor
        ? {
            id: queryDto.cursor,
          }
        : undefined,
      take: queryDto.take,
      orderBy: {
        id: 'asc',
      },
      include: {
        author: true,
        property: true,
        attrs: true,
        amenities: true,
        savedBy: true,
      },
    });
  }

  async findOne(id: string) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        property: true,
        attrs: true,
        amenities: true,
        savedBy: true,
      },
    });
    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        title: updatePostDto.title,
        mode: updatePostDto.mode,
        price: updatePostDto.price,
        thumbnail: updatePostDto.thumbnail,
        images: updatePostDto.images,
        property: updatePostDto.propertyId
          ? {
              connect: {
                id: updatePostDto.propertyId,
              },
            }
          : undefined,
        attrs: updatePostDto.attrIds
          ? {
              connect: updatePostDto.attrIds.map((id) => ({ id })),
            }
          : undefined,
        amenities: updatePostDto.amenityIds
          ? {
              connect: updatePostDto.amenityIds.map((id) => ({ id })),
            }
          : undefined,
        address: updatePostDto.address,
      },
      include: {
        author: true,
        property: true,
        attrs: true,
        amenities: true,
        savedBy: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch(deletePostDto: DeletePostDto) {
    return await this.prismaService.post.deleteMany({
      where: {
        id: {
          in: deletePostDto.ids,
        },
      },
    });
  }

  async findMyPosts(userId: string) {
    return await this.prismaService.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        property: true,
        attrs: true,
        amenities: true,
        savedBy: true,
      },
    });
  }

  async changePostStatus(id: string, changePostStatusDto: ChangePostStatusDto) {
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        status: changePostStatusDto.status,
      },
      include: {
        author: true,
        property: true,
        attrs: true,
        amenities: true,
        savedBy: true,
      },
    });
  }
}
