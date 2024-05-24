// filter.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsInt,
  IsIn,
} from 'class-validator';

export class FilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  district: string;

  // @ApiProperty({ required: false })
  // @IsOptional()
  // @IsNumber()
  // @Min(0)
  // age?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fathername?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  classname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  filter: any;
}

export class AgeQueryParamDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Age must be an integer number' })
  @Min(0, { message: 'Age must not be less than 0' })
  age?: number;

  @IsOptional()
  @IsString()
  @IsIn(['>', '<', '>=', '<='], { message: 'Age filter must be one of ">", "<", ">=", "<=".' })
  ageFilter?: string;
}
