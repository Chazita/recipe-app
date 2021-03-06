import { IsString, IsNumber, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateStepDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  stepNumber: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty()
  stepDescription: string;
}

export default CreateStepDTO;
