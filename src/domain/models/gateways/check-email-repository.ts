import { UserRoleModel } from "@/domain/models/user";

export const CHECK_EMAIL_REPOSITORY = "CHECK_EMAIL_REPOSITORY";

export interface ICheckEmailRepository {
  checkEmail: (email: string) => Promise<ICheckEmailRepository.Result>
}

export namespace ICheckEmailRepository {
  export type Result = {
    id: string | number
    firstName: string
    lastName: string
    email: string
    password: string,
    roles: UserRoleModel
  }
}