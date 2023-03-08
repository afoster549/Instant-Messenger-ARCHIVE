let messageFeild = document.getElementById("messageSendBoxInput")
let chatsContainer = document.getElementById("chatsContainer")

let lastMessage = ""
let enabled = false

function createMessage(iconURL, usernameText, messageText, person) {
    let messageBox = document.createElement("div")
    messageBox.className = "chat"

    if (lastMessage === person) {
        messageBox.id = `${person}FollowUp`
    } else {
        messageBox.id = person

        let icon = document.createElement("img")
        icon.src = iconURL
        icon.draggable = false

        let username = document.createElement("p")
        username.id = "name"
        username.innerText = usernameText

        messageBox.appendChild(icon)
        messageBox.appendChild(username)
    }

    lastMessage = person

    let content = document.createElement("p")
    content.id = "content"
    content.innerText = messageText

    messageBox.appendChild(content)
    chatsContainer.appendChild(messageBox)
}

socket.on("received", (data) => {
    let icon = data[0]
    let username = data[1]
    let message = data[2]

    createMessage(icon, username, message, "contact")
})

function sendMessage() {
    if (messageFeild.value != "" && currentContact != "") {
        createMessage("https://cdn.discordapp.com/avatars/621024638641766438/80b827bdaf4c4fda05f39a77711fa6a9.webp?size=80", "123 Game", messageFeild.value, "user")
        socket.emit("sendMessage", [clientToken, clientId, currentContact, messageFeild.value])

        messageFeild.value = ""
    }
}

messageFeild.addEventListener("keydown", function(key) {
    if (key.code === "Enter") {
        sendMessage()
    }
})

document.body.addEventListener("keydown", function(key) {
    let keycode = key.keyCode

    const valid = (keycode > 47 && keycode < 58) || keycode == 32 || keycode == 13 || (keycode > 64 && keycode < 91)   || (keycode > 95 && keycode < 112) || (keycode > 185 && keycode < 193) || (keycode > 218 && keycode < 223)

    if (valid === true && enabled === true) {
        messageFeild.focus()
    }
})