import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'EveF1', description: 'Username користувача' })
  username: string;

  @ApiProperty({ example: 'supersecret', description: 'Пароль користувача' })
  password: string;
}
