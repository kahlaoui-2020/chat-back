import { Timestamp } from "rxjs";
import { Room } from "src/rooms/entities/room.model";

export class Message {

    id?: string;
    sender?: string;
    content?: string;
    creationDate?: Timestamp<Date>;
    room ?: Room;


    
}
