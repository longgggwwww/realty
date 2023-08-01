import { Test, TestingModule } from '@nestjs/testing';
import { EstateUtilsController } from './estate-utils.controller';
import { EstateUtilsService } from './estate-utils.service';

describe('EstateUtilsController', () => {
  let controller: EstateUtilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstateUtilsController],
      providers: [EstateUtilsService],
    }).compile();

    controller = module.get<EstateUtilsController>(EstateUtilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
