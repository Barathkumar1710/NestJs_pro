// import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { plainToClass } from 'class-transformer';
// import { StudentValidator } from '../validator/student.validator'; // Import StudentValidator

// @Injectable()
// export class ValidationInterceptor implements NestInterceptor {
//   constructor(private readonly studentValidator: StudentValidator) {} // Inject StudentValidator

//   async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
//     const request = context.switchToHttp().getRequest();
//     const dto = plainToClass(request.metatype, request.body);

//     // Perform validation using StudentValidator
//     try {
//       this.studentValidator.validateStudent(dto);
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }

//     return next.handle();
//   }
// }
