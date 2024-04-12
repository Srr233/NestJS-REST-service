import { Injectable, NotFoundException } from '@nestjs/common';
import { Album_I } from './interfaces/Album_I';
import { CreateAlbumtDto } from './dto/CreateAlbumDto';
import { randomUUID } from 'crypto';
import { UpdateAlbumtDto } from './dto/UpdateAlbumDto';

@Injectable()
export class AlbumService {
  private readonly albums: Album_I[] = [];

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    return this.albums.find((artist) => artist.id === id);
  }

  create(data: CreateAlbumtDto) {
    const newArtist = {
      ...data,
      id: randomUUID(),
    };
    this.albums.push(newArtist);
  }

  updateArtist(id: string, updateDto: UpdateAlbumtDto) {
    const indexOfArtist = this.albums.findIndex((v) => v.id === id);
    if (indexOfArtist === -1) throw new NotFoundException();
    this.albums[indexOfArtist] = {
      ...this.albums[indexOfArtist],
      ...updateDto,
    };
  }

  delete(id: string) {
    const indexOfArtist = this.albums.findIndex((v) => v.id === id);
    if (indexOfArtist > -1) {
      this.albums.splice(indexOfArtist, 1);
      return true;
    }
    return false;
  }
}
