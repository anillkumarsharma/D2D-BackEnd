import { Test, TestingModule } from '@nestjs/testing';
import { FeTaskAssignmentController } from './fe-task-assignment.controller';

describe('FeTaskAssignmentController', () => {
  let controller: FeTaskAssignmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeTaskAssignmentController],
    }).compile();

    controller = module.get<FeTaskAssignmentController>(FeTaskAssignmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
