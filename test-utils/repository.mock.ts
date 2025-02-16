import { Repository } from 'typeorm';

// Define a generic type for mocking repositories
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any, any>;
};

// Factory function to mock TypeORM repository
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }),
);
