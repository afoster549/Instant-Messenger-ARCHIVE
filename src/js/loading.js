const { ipcRenderer } = require("electron")
const ipc = ipcRenderer

const stausText = document.getElementById("status")

ipc.send("sync-load")

ipc.on("connected", () => {
    stausText.innerText = "Connected"

    setTimeout(function() {
        stausText.innerText = "Authenticating..."
    }, 100)
})

ipc.on("authenticated", () => {
    stausText.innerText = "Authenticated"

    setTimeout(function() {
        stausText.innerText = "Loading..."
    }, 100)
})

ipc.on("loaded", () => {
    stausText.innerText = "Loaded"
})