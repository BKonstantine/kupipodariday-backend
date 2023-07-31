import {
  IsString,
  Length,
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

  @Length(1, 64)
  @IsNotEmpty()
  @IsString()
  username: string;

  @Length(1, 200)
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
