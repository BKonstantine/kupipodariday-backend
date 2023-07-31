import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(1)
  @MaxLength(64)
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  password: string;

  @MaxLength(200)
  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;
}
