import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEstateTypeDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  icon: string;
}
