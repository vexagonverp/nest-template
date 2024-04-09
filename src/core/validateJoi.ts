import { PipeTransform, BadRequestException } from '@nestjs/common';
import * as joi from 'joi';

export class ValidatorJoiPipe<Dto> implements PipeTransform<Dto> {
  constructor(private schema: joi.ObjectSchema<any>) {}
  public transform(value: Dto): Dto {
    const result = this.schema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
