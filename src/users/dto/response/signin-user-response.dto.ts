import { IsString, IsNotEmpty } from 'class-validator';

export class SigninUserResponse {
  @IsNotEmpty()
  @IsString()
  access_token: string;
}
