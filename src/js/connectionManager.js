const fs = require("fs")

let socket = io("wss://messengerServer.123game.repl.co")

let clientToken = null
let clientId = null

fs.readFile("./data/user.json", 'utf8', (error, JSONString) => {
    clientToken = JSON.parse(JSONString).token
    clientId = JSON.parse(JSONString).id

    // Updating socketId on server

    socket.emit("recivedData", clientId)
})

socket.on("disconnect", () => {
    window.location.href = `./connection.html?${document.title.split(" - Instant Messenger")[0]}`
})