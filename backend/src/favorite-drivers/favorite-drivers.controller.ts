import {
  Controller,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { FavoriteDriversService } from './favorite-drivers.service';
import { RolesGuard } from '../auth/gurads/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('favorite-drivers')
@ApiBearerAuth('access-token')
@Roles(UserRole.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
export class FavoriteDriversController {
  constructor(private readonly favService: FavoriteDriversService) {}

  @Post(':driverId')
  addFavorite(@Req() req, @Param('driverId', ParseIntPipe) driverId: number) {
    return this.favService.addFavorite(req.user.id, driverId);
  }

  @Delete(':driverId')
  removeFavorite(
    @Req() req,
    @Param('driverId', ParseIntPipe) driverId: number,
  ) {
    return this.favService.removeFavorite(req.user.id, driverId);
  }

  @Get('me')
  getMyFavorites(@Req() req) {
    return this.favService.getFavoritesByUser(req.user.id);
  }
}
