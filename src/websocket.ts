import { io } from "./http";

interface userDetails {
    socket_id: string,
    username: string,
    room: string
}

interface Message {
    room: string,
    text: string,
    createdAt: Date,
    username: string
}


const user: userDetails[] = new Array()

const messages: Message[] = []


//recebendo as informações vinda do cliente enviadas pelo metódo emit.
io.on('connection', (socket) => {
    socket.on('select_room', (data, callback) => {
        socket.join(data.room);

        const userAtRoom = user.find(user => user.username === data.username && user.room === data.room)

        if (userAtRoom) {
            userAtRoom.socket_id = socket.id
        } else {
            user.push({
                room: data.room,
                username: data.username,
                socket_id: socket.id,
            })
        } 

        const messageRoom = getMessagesRoom(data.room)
        callback(messageRoom)
    })

    socket.on("message", data => {
        //salvando as mensagens 
        const message: Message = {
            room: data.room,
            username: data.username,
            text: data.message,
            createdAt: new Date()
        }

        messages.push(message)

        //enviar para todos usuarios da sala
        io.to(data.room).emit("message", message)
    })
})


function getMessagesRoom(room: string) {
    const messageRoom = messages.filter(message => message.room === room)

    return messageRoom
}