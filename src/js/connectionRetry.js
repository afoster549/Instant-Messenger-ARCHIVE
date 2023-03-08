let timoutTime = 0

setTimeout(function() {
    timoutTime = 5000

    try {
        let socket = io("ws://api.v1.messenger.123game.dev")

        socket.on("connect", () => {
            window.location.href = `./${window.location.search.toLowerCase().split("?")[1]}.html`

            fs.readFile("./data/user.json", 'utf8', (error, JSONString) => {
                let clientId = JSON.parse(JSONString).id

                socket.emit("recivedData", clientId)
            })
        })
    } catch (error) {
        console.warn(error)
    }
}, timoutTime)

setTimeout(function() {
    window.location.reload()
}, 30000)