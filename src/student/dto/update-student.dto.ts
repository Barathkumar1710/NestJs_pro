import {
  IsString,
  IsDate,
  IsInt,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDTO {
  @ApiProperty({
    description: 'The full name of the student',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString({ message: 'Full name must be a string' })
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'Full name must only contain characters',
  })
  @MinLength(3, { message: 'Full name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Full name cannot be longer than 100 characters' })
  @IsOptional()
  fullName: string;

  @ApiProperty({ description: 'The gender of the student' })
  @IsOptional()
  @IsString({ message: 'Gender must be a string' })
  gender: string;

  @ApiProperty({
    description: 'The full name of the student',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString({ message: 'Full name must be a string' })
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'Full name must only contain characters',
  })
  @MinLength(3, { message: 'Full name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Full name cannot be longer than 100 characters' })
  @IsOptional()
  fatherName: string;

  @ApiProperty({
    description: 'The full name of the student',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString({ message: 'Full name must be a string' })
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'Full name must only contain characters',
  })
  @MinLength(3, { message: 'Full name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Full name cannot be longer than 100 characters' })
  @IsOptional()
  motherName: string;

  @ApiProperty({
    description: 'The permanent address of the student',
    minLength: 3,
    maxLength: 255,
  })
  @IsOptional()
  permanentAddress: string;

  @ApiProperty({
    description: 'The current address of the student',
    minLength: 3,
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Current address must be a string' })
  currentAddress: string;

  @ApiProperty({
    description: 'The district of the student',
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'District must be a string' })
  district: string;

  @ApiProperty({ description: 'The date of birth of the student' })
  @IsOptional()
  dob: Date;

  @ApiProperty({ description: 'The age of the student' })
  @IsOptional()
  @IsInt({ message: 'Age must be an integer' })
  age: number;
  
  @ApiProperty({ description: 'The year of the student' })
  @IsOptional()
  @IsInt({ message: 'Year must be an integer' })
  year: number;

  @ApiProperty({
    description: 'The class name of the student',
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'Class name must be a string' })
  className: string;
}
