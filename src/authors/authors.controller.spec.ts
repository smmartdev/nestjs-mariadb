import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './create-author.dto';
import { Author } from './author.entity';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: AuthorsService;

  // Mock the AuthorsService
  const mockAuthorsService = {
    create: jest.fn((dto: CreateAuthorDto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn(() => [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
    ]),
    findOne: jest.fn((id: number) => ({
      id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    })),
    update: jest.fn((id: number, dto: CreateAuthorDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: number) => null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: mockAuthorsService,
        },
      ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };

      const result = await controller.create(createAuthorDto);
      expect(result).toEqual({
        id: expect.any(Number),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      });
      expect(service.create).toHaveBeenCalledWith(createAuthorDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single author by ID', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an author and return the updated author', async () => {
      const updateAuthorDto: CreateAuthorDto = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
      };

      const result = await controller.update(1, updateAuthorDto);
      expect(result).toEqual({
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
      });
      expect(service.update).toHaveBeenCalledWith(1, updateAuthorDto);
    });
  });

  describe('remove', () => {
    it('should remove an author and return nothing', async () => {
      await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
