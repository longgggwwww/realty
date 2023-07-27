import { Module } from '@nestjs/common';
import { GgdriveService } from './ggdrive.service';

@Module({
  providers: [GgdriveService],
  exports: [GgdriveService],
})
export class GgdriveModule {}
