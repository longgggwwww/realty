export class CreateUserDto {
  id: string;
  profile: Profile;
  authTime: number;
  isActive: boolean;
}

type Profile = {
  fullName: string;
  gender: boolean;
  dob: Date;
  bio: string;
  address: Address;
  avatar: string;
  background: string;
};

type Address = {
  provide: string;
  district: string;
  ward: string;
};
