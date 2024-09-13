import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'body') {
        const parsedValue = this.schema.parse(value);
        return parsedValue;
      }
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        );
      }
    }
  }
}
