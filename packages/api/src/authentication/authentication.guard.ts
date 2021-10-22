import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class AuthenticationGuard extends AuthGuard('jwt') {}
