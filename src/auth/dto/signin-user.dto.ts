import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class SigninUserDto {
  @MinLength(1)
  @MaxLength(64)
  @IsNotEmpty()
  @IsString()
  username: string;

  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  password: string;
}
