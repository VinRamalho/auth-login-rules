import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail({}, { message: 'E-mail invalid' })
  email: string;
  @IsNotEmpty()
  password: string;
}
