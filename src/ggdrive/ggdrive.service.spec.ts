import { Test, TestingModule } from '@nestjs/testing';
import { GgdriveService } from './ggdrive.service';

describe('GgdriveService', () => {
  let service: GgdriveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GgdriveService],
    }).compile();

    service = module.get<GgdriveService>(GgdriveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
