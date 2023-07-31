import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateEstateTypeDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsUrl()
  icon: string;
}
