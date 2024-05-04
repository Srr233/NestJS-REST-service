import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TrackModule } from '../src/track/track.module';
import { CreateTrackDto } from '../src/track/dto/CreateTrackDto';
import { UpdateTrackDto } from '../src/track/dto/UpdateTrackDto';

describe('TrackController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TrackModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  const updateDto: UpdateTrackDto = {
    name: 'TrackUpdate',
    artistId: null,
    albumId: null,
    duration: 2,
  };
  const TestDto: CreateTrackDto = {
    name: 'Track',
    artistId: null,
    albumId: null,
    duration: 2,
  };

  let currTrackData;
  it('/track (GET)', async () => {
    await request(app.getHttpServer()).get('/track').expect(200);
  });

  it('/track (POST)', async () => {
    await request(app.getHttpServer()).post('/track').send(TestDto).expect(201);
  });

  it('/track/:id (GET)', async () => {
    await request(app.getHttpServer())
      .get('/track')
      .expect(200)
      .then((response) => {
        currTrackData = response.body[0];
      });

    await request(app.getHttpServer())
      .get(`/track/${currTrackData.id}`)
      .expect(200);
  });

  it('/track/:id (PUT)', async () => {
    await request(app.getHttpServer())
      .put(`/track/${currTrackData.id}`)
      .send(updateDto)
      .expect(200);
  });

  it('/track/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/track/${currTrackData.id}`)
      .expect(200);
    await request(app.getHttpServer())
      .get(`/track/${currTrackData.id}`)
      .expect(404);
  });
});
