import { Users } from 'src/user/entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './types/profile.type';
import { FollowEntity } from './entity/follow.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async getProfile(
    userId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const profile = await this.userRepository.findOne({
      where: { username: profileUsername },
    });
    // if(profile) {
    //     return this.buildProfileResponse(profile);
    // }
    if (!profile) {
      throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
    }
    return { ...profile, following: false };
  }
  async followProfile(
    currentUserId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const profileUser = await this.userRepository.findOne({
      where: { username: profileUsername },
    });

    if (!profileUser) {
      throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
    }

    if (currentUserId === profileUser.id) {
      throw new HttpException(
        'Follower and following user cannot be the same',
        HttpStatus.BAD_REQUEST,
      );
    }

    const follow = await this.followRepository.findOne({
      where: {
        followerId: currentUserId,
        followingId: profileUser.id,
      },
    });

    // if not following, create a new follow entity and save it
    if (!follow) {
      const newFollow = new FollowEntity();
      newFollow.followerId = currentUserId;
      newFollow.followingId = profileUser.id;
      await this.followRepository.save(newFollow); // save the follow entity
    }
    return { ...profileUser, following: true };
  }

  // unfollow a profile
  async unfollowProfile(
    currentUserId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const profileUser = await this.userRepository.findOne({
      where: { username: profileUsername },
    });

    if (!profileUser) {
      throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
    }

    if (currentUserId === profileUser.id) {
      throw new HttpException(
        'Follower and following user cannot be the same',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    console.log(profileUser,'profileUser');
    console.log(currentUserId,'currentUserId');
    
    await this.followRepository.delete({
        followerId: currentUserId,
        followingId: profileUser.id,
    });

    // if unfollowing, delete the follow entity from the database and return the profile
    return { ...profileUser, following: false };
  }

   
  buildProfileResponse(profile: any) {
    delete profile?.email;
    console.log(profile);

    return { profile };
  }
}
