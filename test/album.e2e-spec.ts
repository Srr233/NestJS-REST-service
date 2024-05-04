import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AlbumModule } from '../src/albums/album.module';
import { CreateAlbumtDto } from '../src/albums/dto/CreateAlbumDto';
import { UpdateAlbumtDto } from '../src/albums/dto/UpdateAlbumDto';

describe('AlbumController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AlbumModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  const updateDto: UpdateAlbumtDto = {
    name: 'nhoJ',
    artistId: null,
    year: 2001,
  };
  const albumTestDto: CreateAlbumtDto = {
    name: 'John',
    artistId: null,
    year: 2000,
  };

  let currAlbumData;
  it('/album (GET)', async () => {
    await request(app.getHttpServer()).get('/album').expect(200);
  });

  it('/album (POST)', async () => {
    await request(app.getHttpServer())
      .post('/album')
      .send(albumTestDto)
      .expect(201);
  });

  it('/album/:id (GET)', async () => {
    await request(app.getHttpServer())
      .get('/album')
      .expect(200)
      .then((response) => {
        currAlbumData = response.body[0];
      });

    await request(app.getHttpServer())
      .get(`/album/${currAlbumData.id}`)
      .expect(200);
  });

  it('/album/:id (PUT)', async () => {
    await request(app.getHttpServer())
      .put(`/album/${currAlbumData.id}`)
      .send(updateDto)
      .expect(200);
  });

  it('/album/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/album/${currAlbumData.id}`)
      .expect(200);
    await request(app.getHttpServer())
      .get(`/album/${currAlbumData.id}`)
      .expect(404);
  });
});
