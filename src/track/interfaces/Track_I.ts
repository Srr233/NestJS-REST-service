import { UUID } from 'crypto';

export interface Track_I {
  id: UUID;
  name: string;
  artistId: UUID | null; // refers to Artist
  albumId: UUID | null; // refers to Album
  duration: number; // integer number
}
