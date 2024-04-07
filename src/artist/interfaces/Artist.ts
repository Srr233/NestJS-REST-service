import { UUID } from 'crypto';

export interface Artist {
  id: UUID;
  name: string;
  grammy: boolean;
}
