import {UserModel} from "@/domain/models/user";

export const GET_USERS_SERVICE = "GET_USERS_SERVICE";

export interface IGetUsersService {
  getUsers: () => Promise<UserModel[]>
}