import { Module } from '@nestjs/common';
import { EstatePropertiesService } from './estate-properties.service';
import { EstatePropertiesController } from './estate-properties.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { GgdriveModule } from 'src/ggdrive/ggdrive.module';

@Module({
  imports: [PrismaModule, CloudinaryModule, GgdriveModule, FirebaseModule],
  controllers: [EstatePropertiesController],
  providers: [EstatePropertiesService],
})
export class EstatePropertiesModule {}
