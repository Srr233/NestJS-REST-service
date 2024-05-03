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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { UpdateArtistDto } from './dto/UpdateArtistDto';
import { isUUID } from '../service/isUUID';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);
    const artist = this.artistService.findOne(id);
    if (artist) return artist;
    throw new NotFoundException(`Artist with "${id}" does not exist!`);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    this.artistService.create(createArtistDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateArtistDto,
  ) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);
    this.artistService.updateArtist(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);
    this.artistService.delete(id);
  }
}
