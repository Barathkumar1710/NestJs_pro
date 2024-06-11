import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';

import slugify from 'slugify';
import { ArticlesResponse } from './types/articlesResponse.interface';
import { ArticleEntity } from './entity/article.entity';
import { Users } from '@app/user/entity/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly dataSource: DataSource,
  ) {}

  buildArticleResponse(article: ArticleEntity): any {
    return { article };
  }

  async createArticle(
    user: Users,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);

    article.author = user;

    article.slug = this.generateSlug(article.title);

    // Note: taglist is optional
    if (!article.tagList) {
      article.tagList = [];
    }

    return await this.articleRepository.save(article);
  }

  // delete article
  async deleteArticle(slug: string, userId: number): Promise<DeleteResult> {
    // fetch article to check if the user is the author and article exists
    const article = await this.getArticleBySlug(slug);

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== userId) {
      throw new HttpException('You are not the author', HttpStatus.FORBIDDEN);
    }

    return await this.articleRepository.delete({ slug });
  }

  // get article
  private generateSlug(title: string): string {
    const uniqueId = Math.random().toString(36).substring(2);
    console.log(uniqueId, 'uniqueId');

    return slugify(title, { lower: true }) + '-' + uniqueId;
  }

  async getArticleBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({ where: { slug } });
  }

  // update article
  async updateArticle(
    slug: string,
    userId: number,
    updateArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.getArticleBySlug(slug);

    if (!article) {
      console.log('inside the error');
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== userId) {
      throw new HttpException('You are not the author', HttpStatus.FORBIDDEN);
    }

    // update slug if title is changed
    if (updateArticleDto.title && article.title !== updateArticleDto.title) {
      console.log(true, 'inside the title');
      article.slug = this.generateSlug(updateArticleDto.title);

      // const newSlug = this.generateSlug(updateArticleDto.title);
      // const existingArticleWithNewSlug = await this.getArticleBySlug(newSlug);

      // Ensure the new slug is unique and not the same as the old one
      //   if (
      //     existingArticleWithNewSlug &&
      //     existingArticleWithNewSlug.id !== article.id
      //   ) {

      //     throw new HttpException('Slug already exists', HttpStatus.CONFLICT);
      //   }
    }

    Object.assign(article, updateArticleDto);

    return await this.articleRepository.save(article);
  }

  async   findAll(userId: number, query: any): Promise<any> {
    const queryBuilder = await this.dataSource
      .getRepository(ArticleEntity)
      .createQueryBuilder('article')
      //alias for building queries
      // Note: eager: true does not work with querybuilder Hence we use leftJoinAndSelect
      .leftJoinAndSelect('article.author', 'author');

    // Filter by Tag
    if (query?.tag) {
      queryBuilder.where('article.tagList LIKE :tag', {
        tag: `%${query?.tag}%`,
      });
    }

    // Filter by author
    if (query?.author) {
      const author = await this.usersRepository.findOne({
        where: { username: query?.author },
      });
      queryBuilder.andWhere('author.id = :author', { author: author?.id });
      // queryBuilder.andWhere('author.username LIKE :author', { author: `%${query.author}%` })
    }

    // filter by favorited
    if (query?.favorited) {
      const author = await this.usersRepository.findOne({
        where: { username: query?.favorited },
        relations: ['favorites'],
      });

      console.log(author?.favorites, 'author?.favorites');

      const ids = author?.favorites.map((favorite) => favorite.id);

      // if the user has favorited articles we should only return the favorited articles
      if (ids?.length) {
        // IN is used to search for a value in an array
        queryBuilder.andWhere('article.id IN (:...ids)', { ids });
      } else {
        // if the user has not favorited any articles, return an empty list
        queryBuilder.andWhere('1=0');
      }
    }

    queryBuilder.orderBy('article.createdAt', 'DESC');

    // count articles for pagination
    const articlesCount = await queryBuilder.getCount();

    // Query filters

    if (query?.limit) {
      queryBuilder.limit(query?.limit);
    }

    if (query?.offset) {
      queryBuilder.offset(query?.offset);
    }

    let favoriteIds: number[] = [];

    if (userId) {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        relations: ['favorites'],
      });

      favoriteIds = user.favorites.map((favorite) => favorite.id);
    }
    console.log(favoriteIds, 'favoriteIds');
    
    const articles = await queryBuilder.getMany();
    // map the articles to add the Favorited property to each article
    const articleWithFavorites = articles.map((article) => {
      const Favorited = favoriteIds.includes(article.id);
      console.log(Favorited, 'Favorited');
      
      return { ...article, Favorited };
    });

    return { articles: articleWithFavorites, articlesCount };
  }

  async favoriteArticle(slug: string, userId: number): Promise<any> {
    const article = await this.getArticleBySlug(slug);

    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    // Check if the user has already favorited the article and if not, add it to the favorites array
    const isNotFavorited = user.favorites.every(
      (favorites) => favorites.id !== article.id,
    );

    // Add the article to the favorites array
    if (isNotFavorited) {
      user.favorites.push(article);
      article.favoritesCount++; // increment the favoritesCount
      await this.usersRepository.save(user); // save the updated user
      await this.articleRepository.save(article); // save the updated article
    }
    return article;
  }
  async unfavoriteArticle(
    slug: string,
    userId: number,
  ): Promise<ArticleEntity> {
    const article = await this.getArticleBySlug(slug);
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    const articleIndex = user.favorites.findIndex(
      (favorite) => favorite.id === article.id,
    );
    console.log(articleIndex, 'articleIndex');

    if (articleIndex >= 0) {
      user.favorites.splice(articleIndex, 1);
      article.favoritesCount--;
      await this.usersRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }
}
