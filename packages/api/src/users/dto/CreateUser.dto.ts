import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export default CreateUserDTO;
