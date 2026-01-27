import { Test, TestingModule } from '@nestjs/testing';
import { MailApiController } from './mail-api.controller';
import { MailApiService } from './mail-api.service';

describe('MailApiController', () => {
  let controller: MailApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailApiController],
      providers: [MailApiService],
    }).compile();

    controller = module.get<MailApiController>(MailApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
