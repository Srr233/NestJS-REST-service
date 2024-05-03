import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AlbumModule } from '../src/albums/album.module';
import { FavoritesModule } from '../src/favorites/favorites.module';
import { CreateAlbumtDto } from 'src/albums/dto/CreateAlbumDto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const favMock = {};
  let dto: CreateAlbumtDto;
  beforeEach(async () => {
    dto = { artistId: null, name: 'fanom', year: 123 };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AlbumModule],
    })
      .overrideProvider(FavoritesModule)
      .useValue(favMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/album (GET)', () => {
    return request(app.getHttpServer()).get('/album').expect(200);
  });

  it('/album (POST and GET)', async () => {
    await request(app.getHttpServer()).post('/album').send(dto);

    await request(app.getHttpServer())
      .get('/album')
      .then((response) => {
        const body = response.body;
        expect(body[0]).toEqual({
          id: expect.any(String),
          artistId: null,
          name: 'fanom',
          year: 123,
        });
      });
  });
});
