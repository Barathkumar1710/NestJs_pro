import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
console.log("inside user dto")
export class RegisterUserDTO {
    @ApiProperty({ description: 'The user name of the student', minLength: 3, maxLength: 100 })
    // @IsNotEmpty()   
    // @IsString()
    readonly username: string;

    @ApiProperty({ description: 'The email of the student' })
    // @IsNotEmpty()   
    // @IsEmail()
    readonly email: string;

    @ApiProperty({ description: 'The password of the student' })
    // @IsNotEmpty()   
    // @IsString()
    readonly password: string;

    @ApiProperty({ description: 'The image of the student' })
    @IsOptional()
    readonly image: string;

    @ApiProperty({ description: 'The bio of the student' })
    @IsOptional()
    readonly bio: string;
}