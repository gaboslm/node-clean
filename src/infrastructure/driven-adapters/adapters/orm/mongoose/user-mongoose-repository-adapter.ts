import {AddUserParams, UserModel} from "@/domain/models/user";
import {UserModelSchema} from "@/infrastructure/driven-adapters/adapters/orm/mongoose/models/user";
import {IAddUserRepository} from "@/domain/models/gateways/add-user-repository";
import {ICheckEmailRepository} from "@/domain/models/gateways/check-email-repository";

export class UserMongooseRepositoryAdapter implements IAddUserRepository, ICheckEmailRepository {

	// We create this function to manage the entity that exists in the domain.
	map(data: any): any {
		const {_id, firstName, lastName, email, password, roles} = data
		return Object.assign({}, {id: _id.toString(), firstName, lastName, email, password, roles})
	}

	async addUser(data: AddUserParams): Promise<UserModel> {
		return await UserModelSchema.create(data);
	}

	async checkEmail(email: string): Promise<ICheckEmailRepository.Result> {
		const user = await UserModelSchema.findOne({email}).exec();
		return user && this.map(user);
	}

	async getUsersRepository(): Promise<UserModel[]> {
		return UserModelSchema.find().select("-password");
	}

}