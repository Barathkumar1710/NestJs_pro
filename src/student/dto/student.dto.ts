// list-students.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { FilterDto } from './filter.dto';
import { Type } from 'class-transformer';

export class ListStudentsDto {
  @ApiProperty()
  @IsOptional()
  page: number;

  @ApiProperty()
  @IsOptional()
  pageSize: number;

  @ApiProperty({ required: false })
  @IsOptional()
  search: string;

  @ApiProperty({ required: false, type: FilterDto})
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterDto)
  filter: FilterDto;
}


