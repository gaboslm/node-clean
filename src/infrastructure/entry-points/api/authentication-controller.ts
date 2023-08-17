import {Mapping, Inject, Post, Body, Adapter} from "@tsclean/core";
import {AUTHENTICATION_SERVICE, IAuthenticationService} from "@/domain/use-cases/authentication-service";
import {ValidateFields} from "@/infrastructure/helpers/validate-fields";

@Mapping('api/v1/authentication')
export class AuthenticationController {

  constructor(
    @Adapter(AUTHENTICATION_SERVICE) private readonly authenticationService: IAuthenticationService
  ) {
  }

  @Post()
  async authController(@Body() data: IAuthenticationService.Params): Promise<IAuthenticationService.Result | any> {

    const {errors, isValid} = ValidateFields.fieldsValidation(data);

    if (!isValid) return {statusCode: 422, body: {"message": errors}}

    const result = await this.authenticationService.auth(data);

    return {
        accessToken: result.accessToken,
        name: result.name
    }
  }
}