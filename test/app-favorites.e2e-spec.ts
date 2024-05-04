import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateTrackDto } from '../src/track/dto/CreateTrackDto';
import { CreateAlbumtDto } from '../src/albums/dto/CreateAlbumDto';
import { CreateArtistDto } from '../src/artist/dto/CreateArtistDto';
import { FavoritesResponse } from 'src/favorites/interface/favoriteResponse';

describe('FavoritesController', () => {
  let app: INestApplication;

  const createTrackDto: CreateTrackDto = {
    albumId: null,
    artistId: null,
    duration: 2,
    name: 'None',
  };
  let currTrack;

  const createAlbumDto: CreateAlbumtDto = {
    artistId: null,
    name: 'album-none',
    year: 2000,
  };
  let currAlbum;

  const createArtistDto: CreateArtistDto = {
    grammy: false,
    name: 'Serduchka Verka',
  };
  let currArtist;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/favs (GET) get empty facorites data', async () => {
    await request(app.getHttpServer()).get('/favs').expect(200);
  });

  it('/favs/track/:id (POST) create track and add', async () => {
    await request(app.getHttpServer())
      .post('/track')
      .send(createTrackDto)
      .expect(201);

    await request(app.getHttpServer())
      .get('/track')
      .expect(200)
      .then((response) => {
        currTrack = response.body[0];
      });

    await request(app.getHttpServer())
      .post(`/favs/track/${currTrack.id}`)
      .expect(201);
  });

  it('/favs/album/:id (POST) create album and add', async () => {
    await request(app.getHttpServer())
      .post('/album')
      .send(createAlbumDto)
      .expect(201);

    await request(app.getHttpServer())
      .get('/album')
      .expect(200)
      .then((response) => {
        currAlbum = response.body[0];
      });

    await request(app.getHttpServer())
      .post(`/favs/album/${currAlbum.id}`)
      .expect(201);
  });

  it('/favs/artist/:id (POST) create artist and add', async () => {
    await request(app.getHttpServer())
      .post('/artist')
      .send(createArtistDto)
      .expect(201);

    await request(app.getHttpServer())
      .get('/artist')
      .expect(200)
      .then((response) => {
        currArtist = response.body[0];
      });

    await request(app.getHttpServer())
      .post(`/favs/artist/${currArtist.id}`)
      .expect(201);
  });

  it('/favs/track/:id (DELETE) delete added track', async () => {
    await request(app.getHttpServer())
      .delete(`/favs/track/${currTrack.id}`)
      .expect(200);
    await request(app.getHttpServer())
      .get('/favs')
      .expect(200)
      .then((response) => {
        const body: FavoritesResponse = response.body;
        expect(body.tracks.find((v) => v.id === currTrack.id)).toBeUndefined();
      });
  });

  it('/favs/album/:id (DELETE) delete added album', async () => {
    await request(app.getHttpServer())
      .delete(`/favs/album/${currAlbum.id}`)
      .expect(200);
    await request(app.getHttpServer())
      .get('/favs')
      .expect(200)
      .then((response) => {
        const body: FavoritesResponse = response.body;
        expect(body.albums.find((v) => v.id === currAlbum.id)).toBeUndefined();
      });
  });

  it('/favs/artist/:id (DELETE) delete added artist', async () => {
    await request(app.getHttpServer())
      .delete(`/favs/artist/${currArtist.id}`)
      .expect(200);
    await request(app.getHttpServer())
      .get('/favs')
      .expect(200)
      .then((response) => {
        const body: FavoritesResponse = response.body;
        expect(
          body.artists.find((v) => v.id === currArtist.id),
        ).toBeUndefined();
      });
  });
});
