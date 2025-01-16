import { Role } from "./user.interface";

export type Segment = "login" | "register";

export interface ILogin {
  userName: string;
  password: string;
}

export interface IRegister extends ILogin {
  repeatPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface IAccessDecodedToken {
  userId: string;
  userName: string;
  email: string;
  role: Role[];
  exp: number;
  iat: number;
}
