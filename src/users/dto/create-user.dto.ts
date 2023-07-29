export class CreateUserDto {
  profile: {
    name?: string;
    dob?: Date;
    gender?: boolean;
    about?: string;
    phone?: string;
    email?: string;
    emailVerified?: boolean;
    address?: {
      provider: string;
      district: string;
      ward: string;
    };
    avatar?: string;
    background?: string;
  };
  providers: string[];
  disabled: boolean;
}
