import { Injectable, NotFoundException } from '@nestjs/common';
import { Track_I } from './interfaces/Track_I';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { randomUUID } from 'crypto';
import { UpdateTrackDto } from './dto/UpdateTrackDto';

@Injectable()
export class TrackService {
  private readonly tracks: Track_I[] = [];

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: randomUUID(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const indexOfTrack = this.tracks.findIndex((v) => v.id === id);
    if (indexOfTrack === -1) throw new NotFoundException();
    this.tracks[indexOfTrack] = {
      ...this.tracks[indexOfTrack],
      ...updateTrackDto,
    };
  }

  delete(id: string) {
    const indexOfTrack = this.tracks.findIndex((v) => v.id === id);
    if (indexOfTrack === -1) throw new NotFoundException();
    this.tracks.splice(indexOfTrack, 1);
  }
}
