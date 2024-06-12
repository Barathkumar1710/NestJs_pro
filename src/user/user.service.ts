import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UserResponse } from '@app/user/types/userResponse.interface';
import { compare } from 'bcrypt';
import { Users } from './entity/user.entity';
import { RegisterUserDTO } from './dto/registerUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async registerUser(registerUserDto: RegisterUserDTO): Promise<Users> {
    try {
      console.log(true);
      const errorResponse = {
        errors: {},
      };
      // Check if the user email already exists in the database
      const userByEmail = await this.userRepository.findOne({
        where: { email: registerUserDto.email },
      });
      // Check if the username already exists in the database
      const userByUsername = await this.userRepository.findOne({
        where: { username: registerUserDto.username },
      });
  
      if (userByEmail) {
        errorResponse.errors['email'] = 'Email has already been taken';
      }
      if (userByUsername) {
        errorResponse.errors['username'] = 'Username has already been taken';
      }
  
      if (userByEmail || userByUsername) {
        throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
      }
  
      // if (userByEmail || userByUsername) {
      //   throw new HttpException(
      //     'Email or username already exists',
      //     // 422 Unprocessable Entity
      //     HttpStatus.UNPROCESSABLE_ENTITY,
      //   );
      // }
  
      // create a new user instance and assign the values from the registerUserDto
      const newUser = new Users();
      Object.assign(newUser, registerUserDto);
      // save the new user instance to the database
      return await this.userRepository.save(newUser);

    } catch (error) {
      console.log("error..", error)
      throw error
    }
  }

  generateJwtToken(user: Users): string {
    return sign(
      // the payload of the JWT token that the client will receive
      {
        id: user.id,
        email: user.email,
        username: user.username,
        image: user.image,
      },
      // TODO: Debug why process.env.JWT_SECRET is not working
      // process.env.JWT_SECRET,
      'barathtopsecret',
    );
  }

  async findUserById(userId: number): Promise<Users> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async loginUser(loginUserDto: {
    email: string;
    password: string;
  }): Promise<Users> {
    const errorResponse = {
      errors: {
        'email or password': 'is invalid',
      },
    };
    // Check if the user email exists in the database
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      // select is required to select the password field from the database
      select: ['id', 'email', 'username', 'password', 'image', 'bio'],
    });
    if (!user) {
      throw new HttpException(
        errorResponse,
        // 401 Unauthorized
        HttpStatus.UNAUTHORIZED,
      );
    }
    // Check if the password is correct and return the user if it is correct
    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new HttpException(
        errorResponse,
        // 401 Unauthorized
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete user.password;
    return user;
  }

  async updateUser(
    userId: number,
    updateUserDto: RegisterUserDTO,
  ): Promise<Users> {
    const user = await this.findUserById(userId);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  buildUserResponse(user: Users): UserResponse {
    return { user: { ...user, token: this.generateJwtToken(user) } };
  }
}