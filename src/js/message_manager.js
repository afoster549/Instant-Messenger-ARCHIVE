function createMessage(msgIconUrl, msgUsername, msgText) {
    const message = document.createElement("div")
    message.className = "message"

    const icon = document.createElement("img")
    icon.id = "profileIcon"
    icon.src = msgIconUrl
    icon.draggable = false

    const username = document.createElement("p")
    username.id = "username"
    username.innerText = msgUsername

    const text = document.createElement("p")
    text.id = "message"
    text.innerText = msgText

    message.appendChild(icon)
    message.appendChild(username)
    message.appendChild(text)
    document.getElementById("message_container").appendChild(message)
}