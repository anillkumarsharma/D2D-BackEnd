import { Test, TestingModule } from '@nestjs/testing';
import { FeusersService } from './feusers.service';

describe('FeusersService', () => {
  let service: FeusersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeusersService],
    }).compile();

    service = module.get<FeusersService>(FeusersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
