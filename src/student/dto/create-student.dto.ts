import { IsString, IsDate, IsInt, MinLength, MaxLength, IsNotEmpty, Matches, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class StudentDTO {
  @ApiProperty({ description: 'The full name of the student', minLength: 3, maxLength: 100 })
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString({ message: 'Full name must be a string' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'Full name must only contain characters' })
  @MinLength(3, { message: 'Full name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Full name cannot be longer than 100 characters' })
  @Transform(({ value }) => value.trim())  // avoiding the spaces 
  fullName: string;

  @ApiProperty({ description: 'The gender of the student' })
  @IsNotEmpty({ message: 'Gender is required' })
  @IsString({ message: 'Gender must be a string' })
  gender: string;

  @ApiProperty({ description: 'The full name of the student', minLength: 3, maxLength: 100 })
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString({ message: 'Full name must be a string' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'Full name must only contain characters' })
  @MinLength(3, { message: 'Full name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Full name cannot be longer than 100 characters' })
  @Transform(({ value }) => value.trim())
  fatherName: string;

  @ApiProperty({ description: 'The full name of the student', minLength: 3, maxLength: 100 })
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString({ message: 'Full name must be a string' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'Full name must only contain characters' })
  @MinLength(3, { message: 'Full name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Full name cannot be longer than 100 characters' })
  @Transform(({ value }) => value.trim())   
  motherName: string;

  @ApiProperty({ description: 'The permanent address of the student', minLength: 3, maxLength: 255 })
  @IsNotEmpty({ message: 'Permanent address is required' })
  @IsString({ message: 'Permanent address must be a string' })
  @MinLength(3, { message: 'Permanent address must be at least 3 characters long' })
  @MaxLength(255, { message: 'Permanent address cannot be longer than 255 characters' })
  permanentAddress: string;

  @ApiProperty({ description: 'The current address of the student', minLength: 3, maxLength: 255 })
  @IsNotEmpty({ message: 'Current address is required' })
  @IsString({ message: 'Current address must be a string' })
  @MinLength(3, { message: 'Current address must be at least 3 characters long' })
  @MaxLength(255, { message: 'Current address cannot be longer than 255 characters' })
  currentAddress: string;

  @ApiProperty({ description: 'The district of the student', minLength: 3, maxLength: 100 })
  @IsNotEmpty({ message: 'District is required' })
  @IsString({ message: 'District must be a string' })
  @MinLength(3, { message: 'District must be at least 3 characters long' })
  @MaxLength(100, { message: 'District cannot be longer than 100 characters' })
  district: string;

  @ApiProperty({ description: 'The date of birth of the student' })
  @IsNotEmpty({ message: 'Date of birth is required' })
  // @IsDate({ message: 'Date of birth must be a valid date' })
  dob: Date;

  @ApiProperty({ description: 'The age of the student' })
  // @IsNotEmpty({ message: 'Age is required' })
  // @IsInt({ message: 'Age must be an integer' })
  age: number;

  @ApiProperty({ description: 'The year of the student' })
  @IsNotEmpty({ message: 'Year is required' })
  @IsInt({ message: 'Year must be an integer' })
  year: number;

  @ApiProperty({ description: 'The class name of the student', minLength: 3, maxLength: 100 })
  @IsNotEmpty({ message: 'Class name is required' })
  @IsString({ message: 'Class name must be a string' })
  @MinLength(3, { message: 'Class name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Class name cannot be longer than 100 characters' })
  className: string;

  @ApiProperty({ description: 'The email of the student' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
}
