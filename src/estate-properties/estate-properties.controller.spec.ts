import { Test, TestingModule } from '@nestjs/testing';
import { EstatePropertiesController } from './estate-properties.controller';
import { EstatePropertiesService } from './estate-properties.service';

describe('EstatePropertiesController', () => {
  let controller: EstatePropertiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstatePropertiesController],
      providers: [EstatePropertiesService],
    }).compile();

    controller = module.get<EstatePropertiesController>(EstatePropertiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
