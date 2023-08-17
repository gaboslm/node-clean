import {Mapping, Post, Body, Adapter} from "@tsclean/core";
import {AddUserParams} from "@/domain/models/user";
import {ADD_USER_SERVICE, IAddUserService} from "@/domain/use-cases/add-user-service";
import {ValidateFields} from "@/infrastructure/helpers/validate-fields";

@Mapping('api/v1/users')
export class AddUserController {

  constructor(
    @Adapter(ADD_USER_SERVICE) private readonly addUserService: IAddUserService
  ) {
  }

  @Post()
  async addUserController(@Body() data: AddUserParams): Promise<IAddUserService.Result | IAddUserService.Exist | any> {

    const {errors, isValid} = ValidateFields.fieldsValidation(data);

    if (!isValid) return {statusCode: 422, body: {"message": errors}}

    const account = await this.addUserService.addUser(data);

    if (account === true) return {statusCode: 400, body: {"message": "Email is already in use"}}

    return account;
  }

}