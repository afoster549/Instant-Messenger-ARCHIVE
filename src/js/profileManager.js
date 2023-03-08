let userProfileName = document.getElementById("userProfileName")
let userProfileStatus = document.getElementById("userProfileStatus")
let userProfileIcon = document.getElementById("userProfileIcon")

let userData = null

function updateUserProfile(data) {
    userProfileName.innerText = data[0]
    userProfileStatus.innerText = data[1]
    userProfileIcon.src = data[2]
}

function loadProfileEditor(data) {
    document.getElementById("userProfileQuickOptions_edit").style.display = "flex"
    document.getElementById("userProfileEdit_username").innerText = data[0]
    document.getElementById("userProfileEdit_icon").src = data[2]
}

// Opening user profile quick options

document.getElementById("userProfileContainer").addEventListener("click", () => {
    let quickOptions = document.getElementById("userProfileQuickOptions")

    if (quickOptions.style.display === "none") {
        quickOptions.style.display = "grid"
    } else {
        quickOptions.style.display = "none"
    }
})

// Logging out

document.getElementById("userProfileQuickOptions_logout").addEventListener("click", () => {
    fs.writeFile("./data/user.json", "{}", 'utf8', (error) => {
        if (error) {
            console.log(error)
        }
    })

    window.location.href = "login.html"
})

// Opening the profile editor

document.getElementById("userProfileQuickOptions_edit").addEventListener("click", () => {
    document.getElementById("userProfileEditContainer").style.display = "flex"
    document.getElementById("userProfileQuickOptions").style.display = "none"
})

// Profile editor interactions

document.getElementById("userProfileEditContainer_close").addEventListener("click", () => {
    document.getElementById("userProfileEditContainer").style.display = "none"
})

document.getElementById("userProfileEdit_iconChangeText").addEventListener("click", () => {
    upec_URLbar.value = userProfileIcon.src
    upec_URLbar.style.display = "flex"

    setTimeout(() => {
        upec_URLbar.style.backgroundColor = "#0000002a"

        upec_URLbar_submit.style.width = "18px"
        upec_URLbar_submit.style.height = "18px"

        upec_URLbar_close.style.width = "18px"
        upec_URLbar_close.style.height = "18px"

        upec_URLbar_main.style.width = "90vw"
        upec_URLbar_main.style.height = "75px"
        upec_URLbar_main.style.backgroundColor = "#2c2c31"
        upec_URLbar_main.style.borderColor = "#ffffff1a"

        upec_URLbar_main_text.style.fontSize = "16px"
        upec_URLbar_main_text.style.color = "#ffffff"

        upec_URLbar_input.style.paddingTop = "12px"
        upec_URLbar_input.style.paddingBottom = "12px"
        upec_URLbar_input.style.paddingRight = "7px"
        upec_URLbar_input.style.paddingLeft = "7px"
        upec_URLbar_input.style.fontSize = "14px"
        upec_URLbar_input.style.backgroundColor = "#c8d5ff05"
        upec_URLbar_input.style.borderColor = "#7c7c7c"
    }, 0)
})

// Checking if the profile URL is valid

document.getElementById("userProfileEditContainer_URLbar_input").addEventListener("input", () => {
    if (document.getElementById("userProfileEditContainer_URLbar_input").value === "") {
        document.getElementById("userProfileEditContainer_URLbar_input").style.borderColor = "#7c7c7c"
    } else if (document.getElementById("userProfileEditContainer_URLbar_input").value.split("https://")[1] != null || document.getElementById("userProfileEditContainer_URLbar_input").value.split("http://")[1] != null ) {
        document.getElementById("userProfileEditContainer_URLbar_input").style.borderColor = "#00ccff"
    } else {
        document.getElementById("userProfileEditContainer_URLbar_input").style.borderColor = "#ff0000"
    }
})

socket.emit("getUserData")

socket.on("recivedUserData", (data) => {
    userData = data

    upec_URLbar_input.value = data[2]

    updateUserProfile(userData)
})

// User profile URL bar

let upec_URLbar_submit = document.getElementById("userProfileEditContainer_URLbar_submit")
let upec_URLbar_close = document.getElementById("userProfileEditContainer_URLbar_close")

let upec_URLbar = document.getElementById("userProfileEditContainer_URLbar")
let upec_URLbar_main = document.getElementById("userProfileEditContainer_URLbar_main")

let upec_URLbar_main_text = document.getElementById("userProfileEditContainer_URLbar_main_text")
let upec_URLbar_input = document.getElementById("userProfileEditContainer_URLbar_input")

upec_URLbar_submit.addEventListener("click", () => {
    userData[2] = upec_URLbar_input.value

    updateUserProfile(userData)

    upec_URLbar_submit.style.width = "0px"
    upec_URLbar_submit.style.height = "0px"

    upec_URLbar_close.style.width = "0px"
    upec_URLbar_close.style.height = "0px"

    upec_URLbar.style.backgroundColor = "#00000000"

    upec_URLbar_main.style.width = "0%"
    upec_URLbar_main.style.height = "0%"
    upec_URLbar_main.style.width = "0%"
    upec_URLbar_main.style.height = "0%"
    upec_URLbar_main.style.backgroundColor = "#00000000"
    upec_URLbar_main.style.borderColor = "#00000000"

    upec_URLbar_main_text.style.fontSize = "0px"
    upec_URLbar_main_text.style.color = "#00000000"

    upec_URLbar_input.style.padding = "0px"
    upec_URLbar_input.style.fontSize = "0px"
    upec_URLbar_input.style.backgroundColor = "#00000000"
    upec_URLbar_input.style.borderColor = "#00000000"

    setTimeout(() => {
        upec_URLbar.style.display = "none"
    }, 200)
})

upec_URLbar_close.addEventListener("click", () => {
    upec_URLbar_submit.style.width = "0px"
    upec_URLbar_submit.style.height = "0px"

    upec_URLbar_close.style.width = "0px"
    upec_URLbar_close.style.height = "0px"

    upec_URLbar.style.backgroundColor = "#00000000"

    upec_URLbar_main.style.width = "0%"
    upec_URLbar_main.style.height = "0%"
    upec_URLbar_main.style.width = "0%"
    upec_URLbar_main.style.height = "0%"
    upec_URLbar_main.style.backgroundColor = "#00000000"
    upec_URLbar_main.style.borderColor = "#00000000"

    upec_URLbar_main_text.style.fontSize = "0px"
    upec_URLbar_main_text.style.color = "#00000000"

    upec_URLbar_input.style.padding = "0px"
    upec_URLbar_input.style.fontSize = "0px"
    upec_URLbar_input.style.backgroundColor = "#00000000"
    upec_URLbar_input.style.borderColor = "#00000000"

    setTimeout(() => {
        upec_URLbar.style.display = "none"
    }, 200)
})

upec_URLbar_submit.style.width = "0px"
upec_URLbar_submit.style.height = "0px"

upec_URLbar_close.style.width = "0px"
upec_URLbar_close.style.height = "0px"

upec_URLbar.style.backgroundColor = "#00000000"

upec_URLbar_main.style.width = "0%"
upec_URLbar_main.style.height = "0%"
upec_URLbar_main.style.width = "0%"
upec_URLbar_main.style.height = "0%"
upec_URLbar_main.style.backgroundColor = "#00000000"
upec_URLbar_main.style.borderColor = "#00000000"

upec_URLbar_main_text.style.fontSize = "0px"
upec_URLbar_main_text.style.color = "#00000000"

upec_URLbar_input.style.padding = "0px"
upec_URLbar_input.style.fontSize = "0px"
upec_URLbar_input.style.backgroundColor = "#00000000"
upec_URLbar_input.style.borderColor = "#00000000"

upec_URLbar.style.display = "none"