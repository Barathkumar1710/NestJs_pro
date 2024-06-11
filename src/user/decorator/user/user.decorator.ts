import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  
  // get the user object from the request
  const request = ctx.switchToHttp().getRequest();

  
  if (!request.user) {
    return null;
  }

  // if data is provided, return the data from the user object
  if (data) {
    console.log(data,'datasss');
    
    return request.user[data];
  }
  return request.user;
});
