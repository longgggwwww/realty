import { IsBoolean, IsNotEmpty } from 'class-validator';

export class TogglePostDto {
  @IsBoolean()
  @IsNotEmpty()
  visible: boolean;
}
