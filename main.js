const { app, BrowserWindow, ipcMain, shell } = require("electron")
const path = require("path")
const ipc = ipcMain

const createWindow = () => {
    // Loading

    const loadingWindow = new BrowserWindow({
        width: 500,
        height: 150,
        resizable: false,
        frame: false,
        show: false,
        icon: "./data/assets/instant_messenger_icon.png",
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

    // Loading main page

    ipc.on("loadedValid", (token) => {
        mainWindow = new BrowserWindow({
            width: 1000,
            height: 600,
            minWidth: 650,
            minHeight: 500,
            frame: false,
            show: false,
            icon: "./data/assets/instant_messenger_icon.png",
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devTools: true,
                preload: path.join(__dirname, "preload.js")
            }
        })

        mainWindow.on("ready-to-show", () => {
            mainWindow.show()
        })

        loadingWindow.close()
        mainWindow.loadFile("src/html/home.html")
    })

    ipc.on("loadedInValid", (token) => {
        mainWindow = new BrowserWindow({
            width: 1000,
            height: 600,
            minWidth: 650,
            minHeight: 500,
            frame: false,
            show: false,
            icon: "./data/assets/instant_messenger_icon.png",
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devTools: true,
                preload: path.join(__dirname, "preload.js")
            }
        })

        mainWindow.on("ready-to-show", () => {
            mainWindow.show()
        })

        loadingWindow.close()
        mainWindow.loadFile("src/html/signup.html")
    })

    // Close app

    ipc.on("close-app", () => {
        mainWindow.close()
    })

    // Maximise app

    ipc.on("maximise-app", () => {
        if (!mainWindow.isMaximized()) {
            mainWindow.maximize()
        } else {
            mainWindow.unmaximize()
        }
    })

    // Minimize app

    ipc.on("minimise-app", () => {
        mainWindow.minimize()
    })

    // Opening a link in a new window

    ipc.on("openLinkInNewWindow", (data, link) => {
        const linkWindow = new BrowserWindow({
            width: 1200,
            height: 800,
            minWidth: 100,
            minHeight: 100,
            frame: true,
            webPreferences: {
                preload: path.join(__dirname, "preload.js")
            }
        })
        
        linkWindow.loadURL(link)
    })

    ipc.on("openLinkInBrowser", (data, link) => {
        shell.openExternal(link)
    })

    // Managing connections
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})