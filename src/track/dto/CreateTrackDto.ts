import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsUUID()
  @IsNotEmpty()
  artistId: UUID | null;

  @IsUUID()
  @IsNotEmpty()
  albumId: UUID | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
