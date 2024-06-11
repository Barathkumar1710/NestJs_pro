import { Module } from '@nestjs/common';
import { ArticleController } from '@app/article/article.controller';
import { ArticleService } from '@app/article/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entity/article.entity';
import { DataSource } from 'typeorm';
import { Users } from '@app/user/entity/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, Users])],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports:[ArticleService]
})
export class ArticleModule {}