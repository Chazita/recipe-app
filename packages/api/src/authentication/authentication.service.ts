import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registrationData: RegisterDTO) {
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === 23505) {
        throw new HttpException(
          'User with that email already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(password, user.password);

      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(`${error.toString()}`, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/;SameSite=Lax;`;
  }

  getCookieForLogOut() {
    return `Authentication=;HttpOnly;Path=/;SameSite=Lax;`;
  }
}
