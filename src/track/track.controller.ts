import {
  Controller,
  Get,
  Param,
  BadRequestException,
  Body,
  Delete,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { isUUID } from '../service/isUuid';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { UpdateTrackDto } from './dto/UpdateTrackDto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);
    return this.trackService.findOne(id);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    this.trackService.create(createTrackDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);
    this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);
    this.trackService.delete(id);
  }
}
