import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class BackendValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // plainToInstance converts plain object to class instance with validation
    // class instance will be stored in 'object'
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length === 0) {
      console.log(true);
      return value;
    }

    // if typeof object is not object, return value
    if (typeof object !== 'object') {
      return value;
    }

    // formatErrors method is used to format validation errors and return them as an object
    throw new HttpException(
      {
        errors: this.formatErrors(errors),
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  // formatErrors method is used to format validation errors and return them as an object
  formatErrors(errors: ValidationError[]) {
    console.log(errors, 'errors');
    return errors.reduce((acc, err) => {
      acc[err.property] = Object.values(err.constraints);
      return acc;
    }, {});
  }
}
