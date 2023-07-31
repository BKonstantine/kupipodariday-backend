import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  IsDate,
  IsInt,
} from 'class-validator';

export class SignupUserResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @MinLength(1)
  @MaxLength(64)
  @IsNotEmpty()
  @IsString()
  username: string;

  @MaxLength(200)
  @IsString()
  about: string;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
