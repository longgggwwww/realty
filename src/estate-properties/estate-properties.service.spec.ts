import { Test, TestingModule } from '@nestjs/testing';
import { EstatePropertiesService } from './estate-properties.service';

describe('EstatePropertiesService', () => {
  let service: EstatePropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstatePropertiesService],
    }).compile();

    service = module.get<EstatePropertiesService>(EstatePropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
