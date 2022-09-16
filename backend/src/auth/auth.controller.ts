import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { CurrentUser } from './current-user.decorator';
import { UserResponse } from '../users/dto/user-response.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(
    @CurrentUser() user: UserResponse,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.signin(user, response);

    response.send(user);
  }
}
