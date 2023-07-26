export class CreateUserDto {
  profile: Profile;
  disabled: boolean;
}

type Profile = {
  name?: string;
  dob?: Date;
  gender?: boolean;
  about?: string;
  email?: string;
  emailVerified?: boolean;
  phone?: string;
  address?: {
    lat: number;
    lng: number;
    detail: string;
  };
  avatar?: string;
  background?: string;
};
