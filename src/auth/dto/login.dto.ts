import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'require your email' })
  @IsEmail({}, { message: 'your email that input in, the format is not valid' })
  email: string;

  @IsNotEmpty({ message: 'require your password' })
  password: string;
}
