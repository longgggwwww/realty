import { Test, TestingModule } from '@nestjs/testing';
import { EstateUtilsService } from './estate-utils.service';

describe('EstateUtilsService', () => {
  let service: EstateUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstateUtilsService],
    }).compile();

    service = module.get<EstateUtilsService>(EstateUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
