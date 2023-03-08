// Opening links in a new window

function openLink() {
    let external = false

    if (external === true) {
        ipc.send("openLinkInNewWindow", "https://123game.dev")
    } else {
        ipc.send("openLinkInNewWindow", "https://123game.dev")
    }
}