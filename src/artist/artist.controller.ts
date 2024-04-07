import {
  Delete,
  Post,
  Body,
  Controller,
  Get,
  Param,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { UpdateArtistDto } from './dto/UpdateArtistDto';
import { isUUID } from 'src/service/isUuid';

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
    return this.artistService.findOne(id);
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
