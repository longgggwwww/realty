import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreatePropertyDto {
  @Length(1, 225)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(1, 225)
  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  icon?: string;
}
