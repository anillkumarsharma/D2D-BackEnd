import { Test, TestingModule } from '@nestjs/testing';
import { FieldExecutivesService } from './field-executives.service';

describe('FieldExecutivesService', () => {
  let service: FieldExecutivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldExecutivesService],
    }).compile();

    service = module.get<FieldExecutivesService>(FieldExecutivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
