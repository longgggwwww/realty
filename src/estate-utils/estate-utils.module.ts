import { Module } from '@nestjs/common';
import { EstateUtilsService } from './estate-utils.service';
import { EstateUtilsController } from './estate-utils.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [EstateUtilsController],
  providers: [EstateUtilsService],
})
export class EstateUtilsModule {}
