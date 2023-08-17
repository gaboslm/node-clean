export type UserEntity = {
  // Attributes
}

export type AddUserParams = Omit<UserEntity, 'id'>
