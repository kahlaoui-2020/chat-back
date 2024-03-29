/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import { CacheStore, CACHE_MANAGER, Inject } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import {Cache} from 'cache-manager';
import { MessagesService } from './messages/messages.service';
import { CreateMessageDto } from './messages/dto/create-message.dto';
var clc = require("cli-color");

@WebSocketGateway({
    cors: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    @WebSocketServer()
    server: any;

    constructor(
        private auth: AuthService,
        private user: UsersService,
        private messageService: MessagesService,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache) { }

    @SubscribeMessage('message')
    async handleEvent(client: Socket, @MessageBody() { sender,  to, message, roomId }) {
        console.log(to)
        const socket = await this.cacheManager.get(to).then((u: string) => {return u}); 
        console.log('to: ', socket, ', message: ', message)
        this.server.to(socket).emit('message', message, sender, roomId);
      
        const createMessage: CreateMessageDto = {
            room: {
                id: roomId,
            },
            sender: sender,
            content: message, 
        } 
        this.messageService.create(createMessage)
        console.log(message, sender, roomId)
       // this.server.send(message);
    }

    async handleConnection(me: Socket, ...args: any[]) {
        const token = me.handshake.headers.authorization
        let userId = this.auth.decode(token).userId;
        await this.cacheManager.set(userId, me.id);
        
       const friends = await this.user.findFriends(userId);
        for (const friend of friends) {
            let socketID = await this.cacheManager.get(friend.id).then((cache) => {return cache});
            console.log('new connection', socketID);
            if (socketID) {
                console.log(clc.underline('emit to'), clc.blue(friend.firstName + ' ' + friend.lastName))
                this.server.to(socketID).emit('user-connected', {
                    friendId: userId,
                })
                this.server.to(me.id).emit('users-connected', {
                    friendId: friend.id,
                })
            }  
        }
    }

    async handleDisconnect(me: Socket) {
        const token = me.handshake.headers.authorization
        let userId = this.auth.decode(token).userId;

        await this.cacheManager.del(userId);
        if(! await this.cacheManager.get(userId).then(u => {return u}))
        console.log(clc.red('null', userId));
        const friends = await this.user.findFriends(userId);
        for (const friend of friends) {
            let socketID = await this.cacheManager.get(friend.id).then((cache) => {return cache});
            if (socketID) {
                this.server.to(socketID).emit('user disconnected', {
                    friendId: userId,
                    });
            }
             
        }
        
    
    }

    afterInit(server: any) {
        console.log('Socket is live')
    }
}
