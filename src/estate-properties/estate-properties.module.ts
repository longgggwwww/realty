import { Module } from '@nestjs/common';
import { EstatePropertiesService } from './estate-properties.service';
import { EstatePropertiesController } from './estate-properties.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { GgdriveModule } from 'src/ggdrive/ggdrive.module';

@Module({
  imports: [FirebaseModule, GgdriveModule],
  controllers: [EstatePropertiesController],
  providers: [EstatePropertiesService],
})
export class EstatePropertiesModule {}
