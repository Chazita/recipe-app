import { Test } from '@nestjs/testing';
import { AuthenticationController } from '../authentication.controller';
import { AuthenticationService } from '../authentication.service';

describe('The Authentication Controller', () => {
  let authenticationController: AuthenticationController;
  let authenticationService: AuthenticationService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [{ provide: AuthenticationService, useValue: {} }],
    }).compile();

    authenticationController = module.get(AuthenticationController);
    authenticationService = module.get(AuthenticationService);
  });

  it('should be defined', () => {
    expect(authenticationController).toBeDefined();
    expect(authenticationService).toBeDefined();
  });
});
