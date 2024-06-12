import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '../user/guards/auth/auth.guard';

import { CreateArticleDto } from './dto/createArticle.dto';

// import { ArticleResponse } from './types/articleResponse.interface';
import { ArticlesResponse } from './types/articlesResponse.interface';
import { User } from '@app/user/decorator/user/user.decorator';
import { Users } from '@app/user/entity/user.entity';
import { BackendValidationPipe } from '@app/shared/pipes/backendvalidation.pipe';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @User('id') userId: number,
    @Query() query: any,
  ): Promise<ArticlesResponse> {
    console.log(userId,'userIddddddddddddd');
    
    return await this.articleService.findAll(userId, query);
  }

  @Get('feed')
  @UseGuards(AuthGuard)
  async getFeed(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponse> {
    return await this.articleService.getFeed(currentUserId, query);
  }
  
  @Post()
  @UsePipes(BackendValidationPipe)
  // authGuard will check if the user is authenticated
  @UseGuards(AuthGuard)
  async createArticle(
    @User() user: Users,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<any> {
    const article = await this.articleService.createArticle(
      user,
      createArticleDto,
    );
    console.log(user, 'usersata');
    return this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  async GetArticle(@Param('slug') slug: string): Promise<any> {
    const article = await this.articleService.getArticleBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(@User('id') userId: number, @Param('slug') slug: string) {
    return await this.articleService.deleteArticle(slug, userId);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(BackendValidationPipe)
  async updateArticle(
    @User('id') userId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticleDto,
  ): Promise<any> {
    const article = await this.articleService.updateArticle(
      slug,
      userId,
      updateArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }


  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async favoriteArticle(
    @User('id') userId: number,
    @Param('slug') slug: string,
  ): Promise<any> {
    return await this.articleService.favoriteArticle(slug, userId);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async unfavoriteArticle(
    @User('id') userId: number,
    @Param('slug') slug: string,
  ): Promise<any> {
    const article = await this.articleService.unfavoriteArticle(slug, userId);
    return this.articleService.buildArticleResponse(article);
  }

 
}
