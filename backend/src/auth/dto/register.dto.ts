import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'EveF1', description: 'Username користувача' })
  username: string;

  @ApiProperty({ example: 'eve@f1.com', description: 'Email користувача' })
  email: string;

  @ApiProperty({ example: 'supersecret', description: 'Пароль користувача' })
  password: string;
}
