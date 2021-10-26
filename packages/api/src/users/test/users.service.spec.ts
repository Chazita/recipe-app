import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getConnectionToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UsersService } from '../users.service';
import { DatabaseTestModule } from '../../database/database-test.module';
import { TestUtils } from '../../utils/TestUtils';
import { Connection } from 'typeorm';
import { stubUser } from '../../utils/stubs/user.stub';
import { HttpException } from '@nestjs/common';
import CreateUserDTO from '../dto/CreateUser.dto';
import { Recipe } from '../../recipe/entities/recipe.entity';
import { Ingredient } from '../../recipe/entities/ingredient.entity';
import { Step } from '../../recipe/entities/step.entity';

describe('The UsersService', () => {
  let service: UsersService;
  let connection: TestUtils;
  let module: TestingModule;

  beforeAll(async () => {
    jest.setTimeout(20000);
    module = await Test.createTestingModule({
      imports: [
        DatabaseTestModule,
        TypeOrmModule.forFeature([User, Recipe, Ingredient, Step]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    const conect: Connection = module.get<Connection>(getConnectionToken());

    connection = new TestUtils(conect);

    await connection.loadUser();
  });

  afterAll(async () => {
    await connection.reloadEntities();
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    const userTest = new CreateUserDTO();
    userTest.email = `test${Date.now()}@email.com`;
    userTest.name = 'Test 2';
    userTest.password = 'password';

    const userResult = await service.create(userTest);

    expect(userResult.email).toBe(userTest.email);
    expect(userResult.name).toBe(userTest.name);
    expect(userResult.password).not.toBe(userTest.password);
    expect(typeof userResult.id).toBe('number');
  });

  it('should return a user with same id', async () => {
    expect(await service.getById(stubUser.id)).toEqual(stubUser);
  });

  it('should return a user with same email', async () => {
    expect(await service.getByEmail(stubUser.email)).toEqual(stubUser);
  });

  it('should throw HttpException', async () => {
    try {
      await service.getByEmail('no@test.com');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});
