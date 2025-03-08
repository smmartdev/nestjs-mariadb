import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book.dto';
import { Book } from './book.entity';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  // Mock the BooksService
  const mockBooksService = {
    create: jest.fn((dto: CreateBookDto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn(() => [
      {
        id: 1,
        title: 'Sample Book',
        publishedDate: '2025-01-01',
        authorId: 1,
      },
    ]),
    findOne: jest.fn((id: number) => ({
      id,
      title: 'Sample Book',
      publishedDate: '2025-01-01',
      authorId: 1,
    })),
    update: jest.fn((id: number, dto: CreateBookDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: number) => null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Sample Book',
        publishedDate: '2025-01-01',
        authorId: 1,
      };

      const result = await controller.create(createBookDto);
      expect(result).toEqual({
        id: expect.any(Number),
        title: 'Sample Book',
        publishedDate: '2025-01-01',
        authorId: 1,
      });
      expect(service.create).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        {
          id: 1,
          title: 'Sample Book',
          publishedDate: '2025-01-01',
          authorId: 1,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single book by ID', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual({
        id: 1,
        title: 'Sample Book',
        publishedDate: '2025-01-01',
        authorId: 1,
      });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a book and return the updated book', async () => {
      const updateBookDto: CreateBookDto = {
        title: 'Updated Book',
        publishedDate: '2025-02-01',
        authorId: 2,
      };

      const result = await controller.update(1, updateBookDto);
      expect(result).toEqual({
        id: 1,
        title: 'Updated Book',
        publishedDate: '2025-02-01',
        authorId: 2,
      });
      expect(service.update).toHaveBeenCalledWith(1, updateBookDto);
    });
  });

  describe('remove', () => {
    it('should remove a book and return nothing', async () => {
      await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
