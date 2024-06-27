import { BadRequestException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  validate,
  isInt,
  min,
  isNotEmptyObject,
} from 'class-validator';
import { CursorDto } from 'src/common/dto/cursor.dto';

export const IsPositiveIntrOrCursor = (
  validationOptions?: ValidationOptions,
) => {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      async: true,
      name: 'isNumberOrCursor',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any, _args: ValidationArguments) {
          if (isInt(value) && min(value, 1)) {
            return true;
          }

          if (value instanceof CursorDto && isNotEmptyObject(value)) {
            const validationResult = await validate(value);

            if (validationResult.length) {
              throw new BadRequestException(validationResult);
            }

            return true;
          }

          return false;
        },
        defaultMessage(args: ValidationArguments) {
          return 'paginationBy must be either a number or a Cursor object';
        },
      },
    });
  };
};
