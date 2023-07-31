import { Module } from '@nestjs/common';
import { EstateTypesService } from './estate-types.service';
import { EstateTypesController } from './estate-types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [EstateTypesController],
  providers: [EstateTypesService],
})
export class EstateTypesModule {}
