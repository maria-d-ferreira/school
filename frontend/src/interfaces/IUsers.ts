export interface IUsers {
  users: IUser[];
}

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  enable?: boolean;
}
