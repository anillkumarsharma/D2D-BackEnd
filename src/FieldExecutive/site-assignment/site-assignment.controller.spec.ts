import { Test, TestingModule } from '@nestjs/testing';
import { SiteAssignmentController } from './site-assignment.controller';

describe('SiteAssignmentController', () => {
  let controller: SiteAssignmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteAssignmentController],
    }).compile();

    controller = module.get<SiteAssignmentController>(SiteAssignmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
