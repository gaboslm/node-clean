import {GetUsersServiceImpl} from "@/domain/use-cases/impl/get-users-service-impl";
import {AddUserServiceImpl} from "@/domain/use-cases/impl/add-user-service-impl";
import {AuthenticationServiceImpl} from "@/domain/use-cases/impl/authentication-service-impl";

import {JwtAdapter} from "@/infrastructure/driven-adapters/adapters/jwt-adapter";
import {BcryptAdapter} from "@/infrastructure/driven-adapters/adapters/bcrypt-adapter";
import {UserMongooseRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/orm/mongoose/user-mongoose-repository-adapter";

import {GET_USERS_REPOSITORY} from "@/domain/models/gateways/get-users-repository";
import {ADD_USER_REPOSITORY} from "@/domain/models/gateways/add-user-repository";
import {CHECK_EMAIL_REPOSITORY} from "@/domain/models/gateways/check-email-repository";
import {HASH_COMPARE_REPOSITORY} from "@/domain/models/gateways/hash-compare-repository";
import {HASH_REPOSITORY} from "@/domain/models/gateways/hash-repository";
import {ENCRYPT_REPOSITORY} from "@/domain/models/gateways/encrypt-repository";

import {GET_USERS_SERVICE} from "@/domain/use-cases/get-users-service";
import {ADD_USER_SERVICE} from "@/domain/use-cases/add-user-service";
import {AUTHENTICATION_SERVICE} from "@/domain/use-cases/authentication-service";
import {ClassProvider} from "@tsclean/core";

export const adapters: ClassProvider[] = [
  {
    useClass: BcryptAdapter,
    provide: HASH_REPOSITORY
  },
  {
    useClass: UserMongooseRepositoryAdapter,
    provide: GET_USERS_REPOSITORY
  },
  {
    useClass: UserMongooseRepositoryAdapter,
    provide: ADD_USER_REPOSITORY
  },
  {
    useClass: UserMongooseRepositoryAdapter,
    provide: CHECK_EMAIL_REPOSITORY
  },
  {
    useClass: BcryptAdapter,
    provide: HASH_COMPARE_REPOSITORY
  },
  {
    useClass: JwtAdapter,
    provide: ENCRYPT_REPOSITORY
  }
]

export const services: ClassProvider[] = [
  {
    useClass: AddUserServiceImpl,
    provide: ADD_USER_SERVICE
  },
  {
    useClass: AuthenticationServiceImpl,
    provide: AUTHENTICATION_SERVICE
  },
  {
    useClass: GetUsersServiceImpl,
    provide: GET_USERS_SERVICE
  }
]