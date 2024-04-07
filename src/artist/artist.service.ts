import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './interfaces/Artist';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { randomUUID } from 'crypto';
import { UpdateArtistDto } from './dto/UpdateArtistDto';

@Injectable()
export class ArtistService {
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
    const indexOfUser = this.artists.findIndex((v) => v.id === id);
    if (indexOfUser === -1) throw new NotFoundException();
    this.artists[indexOfUser] = {
      ...this.artists[indexOfUser],
      name: updateDto.name,
      grammy: updateDto.grammy,
    };
  }

  delete(id: string) {
    const indexOfUser = this.artists.findIndex((v) => v.id === id);
    if (indexOfUser > -1) {
      this.artists.splice(indexOfUser, 1);
      return true;
    }
    return false;
  }
}
