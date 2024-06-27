import { plainToInstance } from 'class-transformer';
import { CursorDto } from 'src/common/dto/cursor.dto';

export const numberOrCursorTransformer = ({ value }) =>
  !isNaN(Number(value)) ? Number(value) : plainToInstance(CursorDto, value);
