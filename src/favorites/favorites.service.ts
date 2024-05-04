import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { Favorites_I } from './interface/Favorite_I';
import { AlbumService } from '../albums/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavoritesResponse } from './interface/favoriteResponse';

@Injectable()
export class FavoritesService {
  private favorites: Favorites_I = { albums: [], artists: [], tracks: [] };

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  getAllFavorites() {
    const favsResponse: FavoritesResponse = {
      albums: this.favorites.albums.map((albumId) => {
        return this.albumService.findOne(albumId);
      }),
      artists: this.favorites.artists.map((artistId) => {
        return this.artistService.findOne(artistId);
      }),
      tracks: this.favorites.tracks.map((trackId) => {
        return this.trackService.findOne(trackId);
      }),
    };
    return favsResponse;
  }

  addTrack(id: string) {
    const track = this.trackService.findOne(id);
    if (!track) throw new UnprocessableEntityException();
    this.favorites.tracks.push(track.id);
  }

  addAlbum(id: string) {
    const album = this.albumService.findOne(id);
    if (!album) throw new UnprocessableEntityException();
    this.favorites.tracks.push(album.id);
  }

  addArtist(id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) throw new UnprocessableEntityException();
    this.favorites.tracks.push(artist.id);
  }

  deleteTrack(id: string) {
    const indexOfTrack = this.favorites.tracks.findIndex(
      (track) => track === id,
    );
    if (indexOfTrack > -1) this.favorites.tracks.splice(indexOfTrack, 1);
  }

  deleteAlbum(id: string) {
    const indexOfAlbum = this.favorites.albums.findIndex(
      (track) => track === id,
    );
    if (indexOfAlbum > -1) this.favorites.albums.splice(indexOfAlbum, 1);
  }

  deleteArtist(id: string) {
    const indexOfArtist = this.favorites.artists.findIndex(
      (track) => track === id,
    );
    if (indexOfArtist > -1) this.favorites.artists.splice(indexOfArtist, 1);
  }
}
