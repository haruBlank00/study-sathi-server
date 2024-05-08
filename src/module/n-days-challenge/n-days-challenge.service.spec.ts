import { Test, TestingModule } from '@nestjs/testing';
import { NDaysChallengeService } from './n-days-challenge.service';

describe('NDaysChallengeService', () => {
  let service: NDaysChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NDaysChallengeService],
    }).compile();

    service = module.get<NDaysChallengeService>(NDaysChallengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
