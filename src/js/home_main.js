ipc.send("sync-home")

ipc.on("res-user-info", (event, data) => {
    console.log(data)
})