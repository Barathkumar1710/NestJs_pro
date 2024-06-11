import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1717652501183 implements MigrationInterface {
  name = 'SeedDb1717652501183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('reactjs'), ('angularjs'), ('vuejs')`,
    );
    await queryRunner.query(
      `INSERT INTO users (username, email, password, bio, image) VALUES ('Barathumar17', 'barathkumar123@gmail.com', '$2b$10$AsIohKB0ImbfN7jTFF2h7eJaWVOI/pLH8qqH2dJe2Jvd9KhxXzENW', 'test1', 'test222')`,
    );
    await queryRunner.query(
      `INSERT INTO article (slug, title, description, body, "tagList", "authorId") VALUES ('first-test-article', 'First Test Article', 'First test article description', ' First test article body and content', 'reactjs, angularjs, ', 1)`,
    );
  }

  public async down(): Promise<void> {}
}
