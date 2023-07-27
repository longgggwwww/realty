import { PartialType } from '@nestjs/mapped-types';
import { CreateEstatePropertyDto } from './create-estate-property.dto';

export class UpdateEstatePropertyDto extends PartialType(CreateEstatePropertyDto) {}
