import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginUserDTO {
  // The readonly keyword makes the property immutable
  @ApiProperty({
    description: 'The user name of the student',
  //   minLength: 3,
  //   maxLength: 100,
  })
  // @IsOptional()
  // @IsString()
  readonly username: string;

  @ApiProperty({ description: 'The email of the student' })
  // @IsNotEmpty({ message: 'Email is required' })
  // @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'The password of the student' })
  // @IsNotEmpty({ message: 'Password is required' })
  // @IsString()
  readonly password: string; 
}
