import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArticleDto {
  // The readonly keyword is used to define a read-only property. Since dto classes are used to define the structure of the data that will be sent to the server, it is important to make sure that the data is not modified after it has been sent. This is why the readonly keyword is used.
  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  readonly description: string;

  @IsOptional()
  readonly body: string;

  @IsOptional()
  readonly tagList?: string[];
}
