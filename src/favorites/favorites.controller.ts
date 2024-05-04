import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { isUUID } from 'class-validator';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favsService: FavoritesService) {}
  @Get()
  allFavorites() {
    return this.favsService.getAllFavorites();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('not correct UUID id');
    this.favsService.addTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('not correct UUID id');
    this.favsService.addAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('not correct UUID id');
    this.favsService.addArtist(id);
  }

  @Delete('track/:id')
  deleteTrack(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('not correct UUID id');
    this.favsService.deleteTrack(id);
  }

  @Delete('album/:id')
  deleteAlbum(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('not correct UUID id');
    this.favsService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  deleteArtist(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('not correct UUID id');
    this.favsService.deleteArtist(id);
  }
}
