import { Test, TestingModule } from '@nestjs/testing';
import { PagesPermissionController } from './pages-permission.controller';

describe('PagesPermissionController', () => {
  let controller: PagesPermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagesPermissionController],
    }).compile();

    controller = module.get<PagesPermissionController>(PagesPermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
