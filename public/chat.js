const socket = io()

const urlSearch = new URLSearchParams(window.location.search)
const username = urlSearch.get("username")
const room = urlSearch.get("select_room")

const userNameDiv = document.getElementById("username")
userNameDiv.innerHTML = `${username} - Sala: ${room}`

//enviando informações para o servidor socket
socket.emit("select_room", {
    username,
    room
}, responseMessages => {
    responseMessages.forEach( message => createMessage(message))
})

document.getElementById("message_input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const message = event.target.value;
        
        const data = {
            room,
            message,
            username,
        }

        socket.emit('message', data);

        event.target.value = ""
    }
})

socket.on("message", (data) => {
    createMessage(data)
})

function createMessage(data) {
    const  messageDiv = document.getElementById("messages")

    messageDiv.innerHTML += `
        <div class="new_message">
            <label class="form-label">
                <strong>${data.username}</strong> <span>${data.text} - </span>
            </label>
        </div>
    `
}

const buttonExit = document.getElementById("logout")

buttonExit.addEventListener("click", () => {
    window.location.href = 'index.html'
})