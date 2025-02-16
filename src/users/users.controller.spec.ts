import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

const userMock: User = {
  id: 1,
  email: 'john.doe@test.com',
  firstName: 'John',
  lastName: 'Doe',
};

//todo: tests
// https://www.youtube.com/watch?v=XbSZnGCJB2I&list=PL4GnUdxYjMlO7wYGGf-bDR7B9k3uUxfR6&index=79
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            // create: jest.fn().mockResolvedValue(userMock),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    expect(await controller.create(userMock)).toEqual(userMock);
  });

  it('should create a user', async () => {
    const newUser = await controller.create({
      firstName: 'a',
      lastName: 'b',
      email: 'wewe',
    });
    console.log(newUser);
    expect(await controller.create({ ...userMock, email: 'wewe' })).toEqual(
      userMock,
    );
  });

  it('should return an array of users', async () => {
    expect(await controller.findAll()).toEqual([]);
  });

  it('should throw a bad request exception', () => {
    expect(() =>
      controller.create({ email: 'asdf', firstName: '', lastName: '' }),
    ).toThrow();
  });
});
