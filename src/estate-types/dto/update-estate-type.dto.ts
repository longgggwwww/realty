import { PartialType } from '@nestjs/mapped-types';
import { CreateEstateTypeDto } from './create-estate-type.dto';

export class UpdateEstateTypeDto extends PartialType(CreateEstateTypeDto) {}
