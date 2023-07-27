import { Module } from '@nestjs/common';
import { EstateTypesService } from './estate-types.service';
import { EstateTypesController } from './estate-types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EstateTypesController],
  providers: [EstateTypesService],
})
export class EstateTypesModule {}
