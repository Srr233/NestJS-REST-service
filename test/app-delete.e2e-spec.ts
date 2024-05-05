import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateTrackDto } from '../src/track/dto/CreateTrackDto';
import { CreateAlbumtDto } from '../src/albums/dto/CreateAlbumDto';
import { CreateArtistDto } from '../src/artist/dto/CreateArtistDto';
import { Track_I } from '../src/track/interfaces/Track_I';
import { Album_I } from '../src/albums/interfaces/Album_I';
import { Artist } from '../src/artist/interfaces/Artist';

describe('FavoritesController', () => {
  let app: INestApplication;

  const createTrackDto: CreateTrackDto = {
    albumId: null,
    artistId: null,
    duration: 2,
    name: 'None',
  };
  let currTrack: Track_I;

  const createAlbumDto: CreateAlbumtDto = {
    artistId: null,
    name: 'album-none',
    year: 2000,
  };
  let currAlbum: Album_I;

  const createArtistDto: CreateArtistDto = {
    grammy: false,
    name: 'Serduchka Verka',
  };
  let currArtist: Artist;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('create /track /album /artist (POST)', async () => {
    await request(app.getHttpServer())
      .post('/track')
      .send(createTrackDto)
      .expect(201);
    await request(app.getHttpServer())
      .post('/album')
      .send(createAlbumDto)
      .expect(201);
    await request(app.getHttpServer())
      .post('/artist')
      .send(createArtistDto)
      .expect(201);
  });

  it("should update data with id's of entities /track /album /artist (PUT)", async () => {
    await request(app.getHttpServer())
      .get('/track')
      .expect(200)
      .then((response) => {
        currTrack = response.body[0];
      });
    await request(app.getHttpServer())
      .get('/album')
      .expect(200)
      .then((response) => {
        currAlbum = response.body[0];
      });
    await request(app.getHttpServer())
      .get('/artist')
      .expect(200)
      .then((response) => {
        currArtist = response.body[0];
      });

    const updateDataTrack = {
      albumId: currAlbum.id,
      artistId: currArtist.id,
    };
    await request(app.getHttpServer())
      .put(`/track/${currTrack.id}`)
      .send(updateDataTrack)
      .expect(200);
    const updateDataAlbum = { artistId: currArtist.id };
    await request(app.getHttpServer())
      .put(`/album/${currAlbum.id}`)
      .send(updateDataAlbum)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/track/${currTrack.id}`)
      .then((response) => {
        const track: Track_I = response.body;
        expect(track.albumId === currAlbum.id).toBeTruthy();
        expect(track.artistId === currArtist.id).toBeTruthy();
      });
    await request(app.getHttpServer())
      .get(`/album/${currAlbum.id}`)
      .then((response) => {
        const album: Album_I = response.body;
        expect(album.artistId === currArtist.id).toBeTruthy();
      });
  });

  it('delete artist and delete it from other entities', async () => {
    await request(app.getHttpServer())
      .delete(`/artist/${currArtist.id}`)
      .expect(200);
  });

  it('track sould be deleted from album entitiy', async () => {
    await request(app.getHttpServer())
      .get(`/artist/${currArtist.id}`)
      .expect(404);

    await request(app.getHttpServer())
      .get(`/album/${currAlbum.id}`)
      .then((response) => {
        const album: Album_I = response.body;
        expect(album.artistId === currArtist.id).toBeFalsy();
      });

    await request(app.getHttpServer())
      .get(`/track/${currTrack.id}`)
      .then((response) => {
        const track: Track_I = response.body;
        expect(track.artistId === currArtist.id).toBeFalsy();
      });
  });
});
