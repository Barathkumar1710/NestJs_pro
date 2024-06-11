import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { UserResponse } from '@app/user/types/userResponse.interface';
import { RegisterUserDTO } from '@app/user/dto/registerUser.dto';
import { LoginUserDTO } from './dto/loginUser.dto';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { User } from './decorator/user/user.decorator';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @Post()
  // validate the request body using the validation pipe
  @UsePipes(ValidationPipe)
  async createUser(
    @Body('user') registerUserDto: RegisterUserDTO,
  ): Promise<UserResponse> {
    const user = await this.usersService.registerUser(registerUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('login')
  // validate the request body using the validation pipe
  @UsePipes(ValidationPipe)
  async loginUser(
    @Body('user') loginUserDto: LoginUserDTO,
  ): Promise<UserResponse> {
    const user = await this.usersService.loginUser(loginUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(
    @User() user: any
  ): Promise<UserResponse> {
    return this.usersService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async updateCurrentUser(
    @User('id', ParseIntPipe) currentUserId: number,
    @Body('user') updateUserDto: RegisterUserDTO,
  ): Promise<UserResponse> {
    const user = await this.usersService.updateUser(
      currentUserId,
      updateUserDto
    );
    return this.usersService.buildUserResponse(user);
  }
}
