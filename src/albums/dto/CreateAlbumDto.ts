import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumtDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public year: number;

  @IsString()
  @IsNotEmpty()
  artistId: string | null;
}
