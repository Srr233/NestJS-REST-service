import { Module, forwardRef } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
  imports: [forwardRef(() => FavoritesModule)],
})
export class ArtistModule {}
