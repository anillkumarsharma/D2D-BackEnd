import { Test, TestingModule } from '@nestjs/testing';
import { FeusersController } from './feusers.controller';
import { FeusersService } from './feusers.service';

describe('FeusersController', () => {
  let controller: FeusersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeusersController],
      providers: [FeusersService],
    }).compile();

    controller = module.get<FeusersController>(FeusersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
