import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [FirebaseModule, PrismaModule],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
