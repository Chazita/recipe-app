import {
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  Get,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import AuthenticationGuard from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import LoginDTO from './dto/login.dto';
import RegisterDTO from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';

@ApiTags('Authentication')
@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(AuthenticationGuard)
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'The users is authenticated' })
  @Get()
  authenticate(@Req() req: RequestWithUser) {
    const user = req.user;
    return user;
  }

  @HttpCode(200)
  @Post('register')
  async register(@Body() registrationData: RegisterDTO) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @Post('log-in')
  async logIn(@Body() login: LoginDTO, @Req() req: Request) {
    const { email, password } = login;

    const userResult = await this.authenticationService.getAuthenticatedUser(
      email,
      password,
    );

    const cookie = this.authenticationService.getCookieWithJwtToken(
      userResult.id,
    );
    req.res.setHeader('Set-Cookie', cookie);

    return userResult;
  }

  @UseGuards(AuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return res.sendStatus(200);
  }
}
