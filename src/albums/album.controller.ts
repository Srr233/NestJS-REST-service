import {
  Delete,
  Post,
  Body,
  Controller,
  Get,
  Param,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumtDto } from './dto/CreateAlbumDto';
import { UpdateAlbumtDto } from './dto/UpdateAlbumDto';
import { isUUID } from '../service/isUUID';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);
    const album = this.albumService.findOne(id);
    if (album) return album;
    throw new NotFoundException();
  }

  @Post()
  create(@Body() createArtistDto: CreateAlbumtDto) {
    this.albumService.create(createArtistDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateAlbumtDto,
  ) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);
    this.albumService.updateArtist(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);
    this.albumService.delete(id);
  }
}
