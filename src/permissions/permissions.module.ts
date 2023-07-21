import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { FirebaseAdminModule } from 'src/firebase-admin/firebase-admin.module';

@Module({
  imports: [FirebaseAdminModule],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
