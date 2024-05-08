import { Test, TestingModule } from '@nestjs/testing';
import { NDaysChallengeController } from './n-days-challenge.controller';

describe('NDaysChallengeController', () => {
  let controller: NDaysChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NDaysChallengeController],
    }).compile();

    controller = module.get<NDaysChallengeController>(NDaysChallengeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
