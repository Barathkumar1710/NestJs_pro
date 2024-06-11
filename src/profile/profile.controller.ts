import { User } from '@app/user/decorator/user/user.decorator';
import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProfileResponseInterface } from './types/profileResponse.interface';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@app/user/guards/auth/auth.guard';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ){}
  @Get(':username')
  async getProfile(
    @User('id') userId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.getProfile(userId, profileUsername);
    return this.profileService.buildProfileResponse(profile);
  }

  @Post(':username/follow')
  @UseGuards(AuthGuard)
  async followProfile(
    @User('id') userId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.followProfile(userId, profileUsername);
    return this.profileService.buildProfileResponse(profile);
  }

  @Delete(':username/unfollow')
  @UseGuards(AuthGuard)
  async unfollowProfile(
    @User('id') userId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileResponseInterface> {
    console.log(userId,'userID');
    
    const profile = await this.profileService.unfollowProfile(userId, profileUsername);
    return this.profileService.buildProfileResponse(profile);
  }
}
