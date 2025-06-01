import { IsNotEmpty, IsString } from "class-validator";

// DTO simple
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}