import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ArtistModule } from '../src/artist/artist.module';
import { CreateArtistDto } from '../src/artist/dto/CreateArtistDto';
import { UpdateArtistDto } from '../src/artist/dto/UpdateArtistDto';
import { Artist } from '../src/artist/interfaces/Artist';

describe('ArtistController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ArtistModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  let currArtistData: Artist;
  const updateDto: UpdateArtistDto = { name: 'nhoJ', grammy: true };
  const artistTestDto: CreateArtistDto = { name: 'John', grammy: false };

  it('/artist (GET)', async () => {
    await request(app.getHttpServer()).get('/artist').expect(200);
  });

  it('/artist (POST)', async () => {
    await request(app.getHttpServer())
      .post('/artist')
      .send(artistTestDto)
      .expect(201);
  });

  it('/artist/:id (GET)', async () => {
    await request(app.getHttpServer())
      .get('/artist')
      .expect(200)
      .then((response) => {
        currArtistData = response.body[0];
      });

    await request(app.getHttpServer())
      .get(`/artist/${currArtistData.id}`)
      .expect(200);
  });

  it('/artist/:id (PUT)', async () => {
    await request(app.getHttpServer())
      .put(`/artist/${currArtistData.id}`)
      .send(updateDto)
      .expect(200);
  });

  it('/artist/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/artist/${currArtistData.id}`)
      .expect(200);
    await request(app.getHttpServer())
      .get(`/artist/${currArtistData.id}`)
      .expect(404);
  });
});
