import { Timestamp } from "rxjs";
import { User } from "src/users/entities/user.model";

export interface Room {
    id:string,
    userI: User,
    userII: User,
    viewI: Timestamp,
    viewII: Timestamp,
}
