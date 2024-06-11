import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@app/user/entity/user.entity';
import { FollowEntity } from './entity/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, FollowEntity])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
