import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { RoleType } from "../helpers/types";

export class SignUp {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(RoleType)
  role: RoleType;
}
