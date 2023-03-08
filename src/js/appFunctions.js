const { ipcRenderer } = require("electron")
const ipc = ipcRenderer

// Close app

closeBtn.addEventListener("click", () => {
    ipc.send("close-app")
})

// Maximise app

maximiseBtn.addEventListener("click", () => {
    ipc.send("maximise-app")
})

// Minimize app

minimiseBtn.addEventListener("click", () => {
    ipc.send("minimise-app")
})