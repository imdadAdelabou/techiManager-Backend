import {
  IsNotEmpty,
  IsEmpty,
  validate,
  ValidationError,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";

export class Attendance {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  visitorId: string;

  @IsNotEmpty()
  @IsNumber()
  startDate: number;

  @IsNumber()
  endDate: number;
}

export class UpdateAttendanceBody {
  @IsString()
  @IsNotEmpty()
  docId: string;

  @IsNumber()
  @IsNotEmpty()
  endDate: number;
}

export async function validator<T>(
  attendance: Attendance
): Promise<ValidationError[]> {
  let errors = await validate(attendance);

  return errors;
}

export async function validatorUpdateAttendanceBody<T>(
  attendance: UpdateAttendanceBody
): Promise<ValidationError[]> {
  let errors = await validate(attendance);

  return errors;
}
