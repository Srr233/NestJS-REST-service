import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Artist } from './interfaces/Artist';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { randomUUID } from 'crypto';
import { UpdateArtistDto } from './dto/UpdateArtistDto';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
  ) {}
  private readonly artists: Artist[] = [];

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  create(data: CreateArtistDto) {
    const newArtist: Artist = {
      ...data,
      id: randomUUID(),
    };
    this.artists.push(newArtist);
  }

  updateArtist(id: string, updateDto: UpdateArtistDto) {
    const indexOfArtist = this.artists.findIndex((v) => v.id === id);
    if (indexOfArtist === -1) throw new NotFoundException();
    this.artists[indexOfArtist] = {
      ...this.artists[indexOfArtist],
      name: updateDto.name,
      grammy: updateDto.grammy,
    };
  }

  delete(id: string) {
    const indexOfArtist = this.artists.findIndex((v) => v.id === id);
    if (indexOfArtist < 0) throw new NotFoundException();
    this.artists.splice(indexOfArtist, 1);
    this.favoriteService.deleteArtist(id);
    return true;
  }
}
