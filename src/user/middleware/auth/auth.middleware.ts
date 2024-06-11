import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { UserService } from '../../user.service';
import { verify } from 'jsonwebtoken';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    // if there is no authorization header, set the user to null and continue
    if (!req.headers.authorization) {
      // console.log(req.headers.authorization,'hee');
      
      // console.log('inside');
      
      req.user = null;
      next();
      return;
    }

    // if there is an authorization header, extract the token from it
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token, 'tokennnn');
    
    try {
      // console.log('inside try');
      
      const decoded = verify(token, 'barathtopsecret')

      // console.log(decoded,'decodedddd');
      
      const user = await this.userService.findUserById(decoded.id);
      // console.log(user,'userrr');
      
      req.user = user;
      
      next();
    } catch (error) {
      req.user = null;
      next();
      return;
    }
  }
}