export const AUTHENTICATION_SERVICE = "AUTHENTICATION_SERVICE";

export interface IAuthenticationService {
  auth: (data: IAuthenticationService.Params) => Promise<IAuthenticationService.Result|IAuthenticationService.Error>;
}

export namespace IAuthenticationService {
  export type Params = {
    email: string;
    password: string
  }

  export type Result = {
    accessToken: string;
    name: string
  }

  export type Error = {
    message: string;
    status: number;
    code: string
  }
}