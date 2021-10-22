import { IsString, IsNumber, IsNotEmpty, MaxLength } from 'class-validator';

class CreateStepDTO {
  @IsNumber()
  @IsNotEmpty()
  stepNumber: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  stepDescription: string;
}

export default CreateStepDTO;
