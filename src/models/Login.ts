import { IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";

export class Login {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
