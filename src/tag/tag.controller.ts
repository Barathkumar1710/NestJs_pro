import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagService } from '@app/tag/tag.service';
import { Tag } from './entity/tag.entity';

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  //GetAllStudents API
  @Get()
  async findAll(): Promise<{ tags: string[] }> {
    const tags = await this.tagService.findAll();
    console.log(tags); 
    //return all tags
    return {
      tags: tags.map((tag) => tag.name),
    };
  }
}
