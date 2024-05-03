import { Artist } from 'src/artist/interfaces/Artist';
import { Album_I } from 'src/albums/interfaces/Album_I';
import { Track_I } from 'src/track/interfaces/Track_I';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album_I[];
  tracks: Track_I[];
}
