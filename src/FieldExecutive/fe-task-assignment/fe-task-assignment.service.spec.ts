import { Test, TestingModule } from '@nestjs/testing';
import { FeTaskAssignmentService } from './fe-task-assignment.service';

describe('FeTaskAssignmentService', () => {
  let service: FeTaskAssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeTaskAssignmentService],
    }).compile();

    service = module.get<FeTaskAssignmentService>(FeTaskAssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
