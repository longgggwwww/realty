import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeletePermissionsDto {
  @IsMongoId({
    each: true,
    message(validationArguments) {
      return `${validationArguments.property}: định dạng không hợp lệ, phải là format của mongoId`;
    },
  })
  @IsNotEmpty({
    message(validationArguments) {
      return `${validationArguments.property}: trường bắt buộc`;
    },
  })
  ids: string[];
}
