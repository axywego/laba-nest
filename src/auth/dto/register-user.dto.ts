// src/auth/dto/register-user.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6) // Минимальная длина пароля
  password: string;
}