import { Timestamp } from "rxjs";
import { Message } from "src/messages/entities/message.model";
import { User } from "src/users/entities/user.model";

export interface Room {
    id?:string,
    userI?: User,
    userII?: User,
    viewI?: Timestamp<Date>,
    viewII?: Timestamp<Date>,
    message?: Message[];
}
