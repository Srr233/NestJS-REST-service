import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function compareUser(
  password: string,
  hash: string,
): Promise<boolean> {
  if (password === undefined || hash === undefined)
    throw new BadRequestException(
      'Required fields: "oldPassword", "newPassword"',
    );
  return await bcrypt.compare(password, hash);
}
