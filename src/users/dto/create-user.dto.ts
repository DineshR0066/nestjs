import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  user_id: string;

  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsNumber()
  zip_code: number;
}
