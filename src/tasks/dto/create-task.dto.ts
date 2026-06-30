import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Название задачи' })
  @IsNotEmpty({ message: 'Строка не должна быть пустой' })
  @IsString()
  title: string;
}
