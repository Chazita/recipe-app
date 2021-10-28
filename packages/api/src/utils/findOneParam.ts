import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

class FindOneParam {
  @IsNumberString()
  @ApiProperty()
  id: string;
}

export default FindOneParam;
