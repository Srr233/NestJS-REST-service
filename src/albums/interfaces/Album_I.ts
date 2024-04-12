import { UUID } from 'crypto';

export interface Album_I {
  id: UUID;
  name: string;
  year: number;
  artistId: string | null;
}
