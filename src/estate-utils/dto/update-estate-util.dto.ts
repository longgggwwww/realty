import { PartialType } from '@nestjs/mapped-types';
import { CreateEstateUtilDto } from './create-estate-util.dto';

export class UpdateEstateUtilDto extends PartialType(CreateEstateUtilDto) {}
