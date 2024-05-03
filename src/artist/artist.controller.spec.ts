import { Test, TestingModule } from '@nestjs/testing';
import { ArtistController } from './artist.controller';
import { CreateArtistDto } from './dto/CreateArtistDto';

describe('ArtistController', () => {
  let controller: ArtistController;
  let dto: CreateArtistDto;
  beforeEach(async () => {
    dto = {
      grammy: true,
      name: 'Sergey',
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      imports: [],
    }).compile();

    controller = module.get<ArtistController>(ArtistController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create an artist', () => {
    const createFn = jest.spyOn(controller, 'create');
    controller.create(dto);

    expect(createFn).toHaveBeenCalled();
    expect(createFn).toHaveBeenCalledWith(dto);
    expect(controller.findAll()[0]).toHaveProperty('grammy');
    expect(controller.findAll()[0]).toHaveProperty('name');
  });
});
