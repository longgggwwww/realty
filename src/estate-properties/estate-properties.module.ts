import { Module } from '@nestjs/common';
import { EstatePropertiesService } from './estate-properties.service';
import { EstatePropertiesController } from './estate-properties.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { GgdriveModule } from 'src/ggdrive/ggdrive.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [FirebaseModule, GgdriveModule, PrismaModule],
  controllers: [EstatePropertiesController],
  providers: [EstatePropertiesService],
})
export class EstatePropertiesModule {}
