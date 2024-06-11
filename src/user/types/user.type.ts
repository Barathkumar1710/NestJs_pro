import { Users } from "@app/user/entity/user.entity";

export type UserType = Omit<Users, 'hashPassword'>