import { Test, TestingModule } from '@nestjs/testing';
import { CommentsSocketService } from './comments-socket.service';

describe('CommentsSocketService', () => {
  let service: CommentsSocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsSocketService],
    }).compile();

    service = module.get<CommentsSocketService>(CommentsSocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
