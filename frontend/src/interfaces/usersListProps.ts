export interface UsersListProps {
  users: User[];
}

export interface User {
  name: string;
  email: string;
  password: string;
  courses?: string[];
  enable: boolean;
}
