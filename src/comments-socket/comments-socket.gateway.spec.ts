import { Test, TestingModule } from '@nestjs/testing';
import { CommentsSocketGateway } from './comments-socket.gateway';
import { CommentsSocketService } from './comments-socket.service';

describe('CommentsSocketGateway', () => {
  let gateway: CommentsSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsSocketGateway, CommentsSocketService],
    }).compile();

    gateway = module.get<CommentsSocketGateway>(CommentsSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
