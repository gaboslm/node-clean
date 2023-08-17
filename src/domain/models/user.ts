export type UserModel = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: UserRoleModel[];
}

export type UserRoleModel = [
  {
    role: string,
  }
]

export type AddUserParams = Omit<UserModel, 'id'>