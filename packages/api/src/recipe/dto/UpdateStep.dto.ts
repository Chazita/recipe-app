import { IsString, IsNumber, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateStepDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;
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

export default UpdateStepDTO;
