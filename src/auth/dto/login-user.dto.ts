// src/auth/dto/login-user.dto.ts
import { IsString, IsEmail } from 'class-validator'; // Убедись, что class-validator установлен

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}