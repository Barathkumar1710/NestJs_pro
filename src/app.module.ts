import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student/student.controller';
import { StudentModule } from './student/student.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'BarathPG',
    database: 'sample_db',
    autoLoadEntities: true,
    synchronize: true,
  }),
  StudentModule],
  controllers: [StudentController],
  providers: [AppService],
})
export class AppModule {}
