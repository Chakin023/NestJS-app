import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'require your fullname' })
  fullName: string;

  @IsNotEmpty({ message: 'require your email' })
  @IsEmail({}, { message: 'your input email format is not valid' })
  email: string;

  @IsNotEmpty({ message: 'require your password' })
  password: string;
}
