import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './user/middleware/auth/auth.middleware';
import { AppController } from './app.controller';
import { ArticleModule } from './article/article.module';
import { ArticleController } from './article/article.controller';
import { ProfileModule } from './profile/profile.module';
import ormConfig from './ormconfig';


@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),
  // StudentModule,
  TagModule,
  UserModule,
  ArticleModule,
  ProfileModule],
  controllers: [AppController, ArticleController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    });
   }  
}
