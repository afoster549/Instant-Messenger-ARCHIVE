const { ipcRenderer } = require("electron")
const ipc = ipcRenderer

const app_close_button = document.getElementById("app_close_button")
const app_maximise_button = document.getElementById("app_maximise_button")
const app_minimise_button = document.getElementById("app_minimise_button")

app_close_button.addEventListener("click", () => {
    ipc.send("app_close")
})

app_maximise_button.addEventListener("click", () => {
    ipc.send("app_maximise")
})

app_minimise_button.addEventListener("click", () => {
    ipc.send("app_minimise")
})