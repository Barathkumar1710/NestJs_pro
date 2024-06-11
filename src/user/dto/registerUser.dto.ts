import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterUserDTO {
    @ApiProperty({ description: 'The user name of the student', minLength: 3, maxLength: 100 })
    @IsOptional()
    @IsString({ message: 'User name must be a string' })
    readonly username: string;

    @ApiProperty({ description: 'The email of the student' })
    @IsOptional()
    @IsEmail({ message: 'Email must be a valid email' })
    readonly email: string;

    @ApiProperty({ description: 'The password of the student' })
    @IsOptional()
    @IsString({ message: 'Password must be a string' })
    readonly password: string;

    @ApiProperty({ description: 'The image of the student' })
    @IsOptional()
    readonly image: string;

    @ApiProperty({ description: 'The bio of the student' })
    @IsOptional()
    readonly bio: string;
}