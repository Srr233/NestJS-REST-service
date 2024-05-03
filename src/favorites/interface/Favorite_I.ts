import { UUID } from 'crypto';

export interface Favorites_I {
  artists: UUID[]; // favorite artists ids
  albums: UUID[]; // favorite albums ids
  tracks: UUID[]; // favorite tracks ids
}
