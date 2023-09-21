import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BrowsePostDto } from './dto/browse-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { QueryDto } from './dto/query.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) { }

  async create(userId: string, createPostDto: CreatePostDto) {
    return await this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        description: createPostDto.description,
        property: createPostDto.propertyId
          ? {
            connect: {
              id: createPostDto.propertyId,
            },
          }
          : undefined,
        amenities: createPostDto.amenityIds
          ? {
            connect: createPostDto.amenityIds.map((id) => ({ id })),
          }
          : undefined,
        price: createPostDto.price,
        thumb: createPostDto.thumb,
        images: createPostDto.images,
        author: {
          connect: {
            id: userId,
          },
        },
        status: createPostDto.status,
        area: createPostDto.area,
        address: {
          province: createPostDto.address.province,
          district: createPostDto.address.district,
          ward: createPostDto.address.ward,
          detail: createPostDto.address.detail,
          lng: createPostDto.address.lng,
          lat: createPostDto.address.lat,
          misc: createPostDto.address.misc,
        },
      },
      include: {
        author: true,
        property: true,
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
        property: true,
        amenities: true,
        author: true,
        savedBy: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.post.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        property: true,
        amenities: true,
        author: true,
        savedBy: true,
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        title: updatePostDto.title,
        price: updatePostDto.price,
        images: updatePostDto.images,
        property: updatePostDto.propertyId
          ? {
            connect: {
              id: updatePostDto.propertyId,
            },
          }
          : undefined,
        amenities: updatePostDto.amenityIds
          ? {
            connect: updatePostDto.amenityIds.map((id) => ({ id })),
          }
          : undefined,
      },
      include: {
        property: true,
        amenities: true,
        author: true,
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
        amenities: true,
        savedBy: true,
      },
    });
  }

  async browsePost(id: string, browsePostDto: BrowsePostDto) {
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        status: browsePostDto.status,
      },
      include: {
        property: true,
        amenities: true,
        author: true,
        savedBy: true,
      },
    });
  }

  async savePost(id: string, userId: string) {
    return await this.prismaService.post.update({
      where: {
        id
      },
      data: {
        savedByIds: {
          push: userId
        }
      },
      include: {
        property: true,
        amenities: true,
        author: true,
        savedBy: true,
      },
    })
  }

  async unsavePost(id: string, userId: string) {
    return await this.prismaService.post.update({
      where: {
        id
      },
      data: {
        savedBy: {
          disconnect: {
            id: userId
          }
        }
      },
      include: {
        property: true,
        amenities: true,
        author: true,
        savedBy: true,
      },
    })
  }
}
