import { Module, forwardRef } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
  imports: [forwardRef(() => FavoritesModule)],
})
export class AlbumModule {}
