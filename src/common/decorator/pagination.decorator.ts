import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { ValidationOptions } from 'class-validator';
import { numberOrCursorTransformer } from 'src/common/transformers/number-or-cursor.transformer';
import { IsPositiveIntrOrCursor } from 'src/common/validators/is-number-or-cursor.validator';

export const Pagination = (validationOptions?: ValidationOptions) => {
  return applyDecorators(
    Transform(numberOrCursorTransformer),
    IsPositiveIntrOrCursor(validationOptions),
  );
};
