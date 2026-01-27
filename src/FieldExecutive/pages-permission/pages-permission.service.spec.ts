import { Test, TestingModule } from '@nestjs/testing';
import { PagesPermissionService } from './pages-permission.service';

describe('PagesPermissionService', () => {
  let service: PagesPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagesPermissionService],
    }).compile();

    service = module.get<PagesPermissionService>(PagesPermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
