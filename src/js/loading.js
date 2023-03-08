// Slower version

const { ipcRenderer } = require("electron")
const ipc = ipcRenderer
const socket = io("wss://messengerServer.123game.repl.co")
const fs = require("fs")

fs.readFile("./data/user.json", "utf8", (error, JSONString) => {
    if (error) {
        console.log(error)
    } else {
        socket.emit("checkToken", [(JSON.parse(JSONString).token), (JSON.parse(JSONString).id)])
    }
})

socket.on("tokenOrIdValid", () => {
    ipc.send("loadedValid")

    document.getElementById("loadingTextP").innerText = "Loading..."
})

socket.on("tokenOrIdInvalid", () => {
    ipc.send("loadedInValid")
})