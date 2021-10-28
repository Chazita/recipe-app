import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class LoginDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export default LoginDTO;
