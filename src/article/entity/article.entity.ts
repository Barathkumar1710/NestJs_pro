import { Users } from '@app/user/entity/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'article' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  body: string;

  @Column('simple-array')
  tagList: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: 0 })
  favoritesCount: number;

  // BeforeUpdate hook to update the updatedAt timestamp
  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  // Relation with users
  // ManyToOne relation with Users and Articles 
  @ManyToOne(() => Users, (user) => user.articles, { eager: true })
  author: Users;
}
