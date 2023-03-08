let currentContact = ""

function loadContactPage(username) {
    currentContact = username

    socket.emit("getMessages", [clientToken, username, 20])
}

function loadContact(iconURL, name, status) {
    let contactBox = document.createElement("div")
    contactBox.id = "contactBox"
    contactBox.className = "contactBox"
    contactBox.id = name
    
    let icon = document.createElement("img")
    icon.src = iconURL
    icon.draggable = false

    let nameText = document.createElement("p")
    nameText.id = "name"
    nameText.innerText = name

    let statusText = document.createElement("p")
    statusText.id = "status"
    statusText.innerText = status
    
    contactBox.appendChild(icon)
    contactBox.appendChild(nameText)
    contactBox.appendChild(statusText)

    let contacts = document.getElementById("contactsContainer")
    contacts.appendChild(contactBox)

    addClickEvent(contactBox)
}

function addClickEvent(element) {
    element.addEventListener("click", function() {
        loadContactPage(element.name)
    })
}

fs.readFile("./data/user.json", 'utf8', (error, JSONString) => {
    if (error) {
        console.log(error)
    } else {
        socket.emit("getContacts", (JSON.parse(JSONString).token))
    }
})

socket.on("contactsRes", (contacts) => {
    for (let i = 0; i < contacts.length; i++) {
        const contactUsername = contacts[i];

        socket.emit("getUserInfo", (contactUsername))
    }
})

socket.on("userInfoRes", (info) => {
    let username = info[0]
    let iconURL = info[1]
    let status = info[2]

    loadContact(iconURL, username, status)
})