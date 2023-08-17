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
  async authController(@Body() data: IAuthenticationService.Params): Promise<IAuthenticationService.Result|IAuthenticationService.Error> {
    
    const {errors, isValid}: {errors: { [key: string]: string}, isValid: boolean } = ValidateFields.fieldsValidation(data);

    if (!isValid){
      return {
        message: "Fullfield validation",
        errors: Object.values(errors),
      }
    } 

    try {
      const result = await this.authenticationService.auth(data);

      return {
        message: "Logged in successfully",
        accessToken: result.accessToken,
      };
      
    } catch (error) { 
      if (error) {
        return {
          message: error.message,
        }
      }
    }
    
  }
}