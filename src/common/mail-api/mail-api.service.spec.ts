import { Test, TestingModule } from '@nestjs/testing';
import { MailApiService } from './mail-api.service';

describe('MailApiService', () => {
  let service: MailApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailApiService],
    }).compile();

    service = module.get<MailApiService>(MailApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
