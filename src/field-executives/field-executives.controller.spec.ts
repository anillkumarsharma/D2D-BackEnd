import { Test, TestingModule } from '@nestjs/testing';
import { FieldExecutivesController } from './field-executives.controller';

describe('FieldExecutivesController', () => {
  let controller: FieldExecutivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldExecutivesController],
    }).compile();

    controller = module.get<FieldExecutivesController>(FieldExecutivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
