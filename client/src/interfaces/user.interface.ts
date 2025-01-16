export interface IUser {
  id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role[];
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  ADMIN,
  USER
}
