import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export default RegisterDTO;
