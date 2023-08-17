import {Adapter, Service} from "@tsclean/core";
import {IAuthenticationService} from "@/domain/use-cases/authentication-service";
import {CHECK_EMAIL_REPOSITORY, ICheckEmailRepository} from "@/domain/models/gateways/check-email-repository";
import {HASH_COMPARE_REPOSITORY, IHashCompare} from "@/domain/models/gateways/hash-compare-repository";
import {ENCRYPT_REPOSITORY, IEncrypt} from "@/domain/models/gateways/encrypt-repository";
import jwt from "jsonwebtoken";
@Service()
export class AuthenticationServiceImpl implements IAuthenticationService {

  constructor(
    @Adapter(ENCRYPT_REPOSITORY) private readonly encrypt: IEncrypt,
    @Adapter(HASH_COMPARE_REPOSITORY) private readonly hashCompare: IHashCompare,
    @Adapter(CHECK_EMAIL_REPOSITORY) private readonly checkEmailRepository: ICheckEmailRepository) {
  }

  async auth(data: IAuthenticationService.Params): Promise<IAuthenticationService.Result|IAuthenticationService.Error> {
    try{
      const account = await this.checkEmailRepository.checkEmail(data.email);
      const isValid = await this.hashCompare.compare(data.password, account.password);
      
      if (isValid) {
        const accessToken = await this.encrypt.encrypt(account);

        return {
          accessToken,
          name: account.firstName
        }
      }
    } catch(error){
      return {
        message: error.message,
        status: 501,
        code: "Authentication Service Error"
      }
    }

    return null;
  }

}