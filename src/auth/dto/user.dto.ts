import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  email: string;

  @ApiProperty({
    example: 'Alex',
    description: 'Имя пользователя',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    example: 'https://picture.com',
    description: 'Имя пользователя',
    required: false,
  })
  picture?: string;

  @ApiProperty({
    example: 'Budai',
    description: 'Фамилия пользователя',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    example: 'Budai',
    description: 'Фамилия пользователя',
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    example: 'Budai',
    description: 'Фамилия пользователя',
    required: false,
  })
  updatedAt?: Date;
}
