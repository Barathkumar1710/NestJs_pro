import { Users } from "../entity/user.entity";
import { UserType } from "@app/user/types/user.type";

 export interface UserResponse {
    user: UserType & { token: string };
}