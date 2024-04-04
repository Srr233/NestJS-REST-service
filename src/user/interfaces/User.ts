import { UUID } from 'crypto';
export interface User_I {
  id: UUID;
  login: string;
  password: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}
