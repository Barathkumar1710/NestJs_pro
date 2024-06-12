import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '@app/article/entity/article.entity';

@Entity({ name: 'users' })
export class Users {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true}) // Specify a custom name for the unique constraint
  email: string;

  @Column({ default: '' })
  image: string;

  @Column()
  username: string;

  // select: false means that the password will not be returned in the response to the client
  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
      // Hash the password before saving it to the database
      this.password = await hash(this.password, 10);
  }
  @Column({ default: '' })
  bio: string;

  //  Relation with Article
  @OneToMany(() => ArticleEntity, (article) => article.author) 
  articles: ArticleEntity[];

  // multiple users can favorite multiple articles and a user can favorite multiple articles
  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[] 
}
