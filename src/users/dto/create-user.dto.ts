export class CreateUserDto {
  profile: Profile;
  isActive: boolean;
}

type Profile = {
  fullName: string;
  gender?: boolean;
  email: string;
  emailVerified: boolean;
  dob?: Date;
  bio?: string;
  address?: Address;
  avatar: string;
  background: string;
};

type Address = {
  provide: string;
  district: string;
  ward: string;
};
