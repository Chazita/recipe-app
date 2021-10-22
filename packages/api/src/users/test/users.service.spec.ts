import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getConnectionToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UsersService } from '../users.service';
import { DatabaseTestModule } from '../../database/database-test.module';
import { Connection } from 'typeorm';

describe('The UsersService', () => {
  let service: UsersService;
  let connection: Connection;
  let module: TestingModule;

  beforeAll(async () => {
    jest.setTimeout(20000);
    module = await Test.createTestingModule({
      imports: [DatabaseTestModule, TypeOrmModule.forFeature([User])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    connection = module.get(getConnectionToken);
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*
  it('should create a new user record and return that', async () => {
    expect(
      await service.create({
        email: 'test@email.com',
        name: '',
        password: mockedUser.password,
      }),
    ).toEqual({
      email: mockedUser.email,
      name: mockedUser.name,
      password: mockedUser.password,
    });
  });

  it('should return a user with same id', async () => {
    expect(await service.getById(mockedUser.id)).toEqual(mockedUser);
  });

  it('should return a user with same email', async () => {
    expect(await service.getByEmail(mockedUser.email)).toEqual(mockedUser);
  });

  it('should throw HttpException', async () => {
    try {
      await service.getByEmail('no@test.com');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
  */
});
