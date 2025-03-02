import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
@IsString()
@IsNotEmpty()
@Length(8, 20)
name: string;

@IsString()
@IsEmail()
@IsNotEmpty()
email: string;

@IsString()
@IsNotEmpty()
@Length(8, 15)
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: 'Password too weak. The password needs to contain capital letters, a number and a symbol.',
  })
password: string;

@IsString()
@IsNotEmpty()
@Length(8, 15)
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: 'Password too weak. The password needs to contain capital letters, a number and a symbol.',
  })
confirmPassword: string;
}
