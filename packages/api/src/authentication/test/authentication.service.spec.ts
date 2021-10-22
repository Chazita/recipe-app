import { Test } from '@nestjs/testing';
import { AuthenticationService } from '../authentication.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
//import * as bcrypt from 'bcrypt';

describe('The AuthenticationService ', () => {
  let authenticationService: AuthenticationService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: UsersService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    authenticationService = module.get(AuthenticationService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(authenticationService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(jwtService).toBeDefined();
  });
});
