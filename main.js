const { app, BrowserWindow, ipcMain, Badge } = require("electron")
const path = require("path")

const io = require("socket.io-client")
const socket = io.connect("wss://api.v1.messenger.123game.dev", {reconnect: true})

const fs = require("fs")

let token = null
let id = null
let userData = null

fs.readFile("./data/user.json", "utf8", (error, JSONString) => {
    if (error) {
        console.log(error)
        app.quit()
    } else {
        const json = JSON.parse(JSONString)

        token = json.token
        id = json.id
    }
})

const createWindow = () => { 
    // Pre setup

    let mainWindow = null

    // Loading

    const loadingWindow = new BrowserWindow({
        width: 500,
        height: 150,
        resizable: false,
        frame: false,
        show: false,
        icon: "./data/assets/icon.png",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, "preload.js")
        }
    })

    loadingWindow.on("ready-to-show", () => {
        loadingWindow.show()
    })

    loadingWindow.loadFile("src/html/loading.html")

    ipcMain.on("sync-load", (event) => {
        socket.on("connect", () => {
            console.log("Connected")
            event.sender.send("connected")
        })

        socket.emit("auth-req", (JSON.stringify({token, id})))

        socket.on("auth-res", (data) => {
            if (data) {
                socket.emit("get-client-info", id)
                event.sender.send("authenticated")
             } else {
                loadingWindow.close()
            }
        })

        socket.on("res-client-info", (data) => {
            userData = data

            event.sender.send("loaded")

            mainWindow = new BrowserWindow({
                width: 1000,
                height: 600,
                minWidth: 650,
                minHeight: 500,
                frame: false,
                show: false,
                icon: "./data/assets/icon.png",
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                    devTools: true,
                    preload: path.join(__dirname, "preload.js")
                }
            })

            loadingWindow.close()

            mainWindow.loadFile("src/html/home.html")
            mainWindow.show()
        })
    })

    ipcMain.on("sync-home", (event) => {
        socket.on("res-user-info", (data) => {
            event.sender.send("res-user-info", data)
        })
    })

    ipcMain.on("get-user-info", (event, name) => {
        socket.emit("get-user-info", name)
    })

    ipcMain.on("app_close", () => {
        mainWindow.close()
    })

    ipcMain.on("app_maximise", () => {
        if (!mainWindow.isMaximized()) {
            mainWindow.maximize()
        } else {
            mainWindow.unmaximize()
        }
    })

    ipcMain.on("app_minimise", () => {
        mainWindow.minimize()
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})