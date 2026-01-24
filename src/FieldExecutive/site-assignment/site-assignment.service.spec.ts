import { Test, TestingModule } from '@nestjs/testing';
import { SiteAssignmentService } from './site-assignment.service';

describe('SiteAssignmentService', () => {
  let service: SiteAssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteAssignmentService],
    }).compile();

    service = module.get<SiteAssignmentService>(SiteAssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
