import * as bcrypt from 'bcrypt';
export async function hashPassword(str: string) {
  const saltrounds = 10;
  const salt = await bcrypt.genSalt(saltrounds);
  const hash = bcrypt.hash(str, salt);
  return hash;
}
