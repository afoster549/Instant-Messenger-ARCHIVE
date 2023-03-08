let signupAvailable = false
let success = true

document.addEventListener("keydown", function(key) {
    if (key.code === "Enter") {
        submitInfo()
    }
})

function submitInfo() {
    document.getElementById("usernameInput").style.borderColor = "#7c7c7c"
    document.getElementById("emailInput").style.borderColor = "#7c7c7c"
    document.getElementById("passwordInput").style.borderColor = "#7c7c7c"
    document.getElementById("warning").innerText = ""

    let usednameDat = document.getElementById("usernameInput").value
    let emailDat = document.getElementById("emailInput").value
    let passwordDat = document.getElementById("passwordInput").value

    if (usednameDat != "" && emailDat != "" && passwordDat.length > 7) {
        socket.emit("signup", [document.getElementById("usernameInput").value, document.getElementById("emailInput").value, document.getElementById("passwordInput").value])
        console.log("Accepted")
    } else {
        if (usednameDat === "" || emailDat === "" || passwordDat.length === "") {
            document.getElementById("usernameInput").style.borderColor = "#7c7c7c"
            document.getElementById("emailInput").style.borderColor = "#7c7c7c"
            document.getElementById("passwordInput").style.borderColor = "#7c7c7c"

            if (usednameDat === "") {
                document.getElementById("usernameInput").style.borderColor = "#ff0000"
            }
            
            if (emailDat === "") {
                document.getElementById("emailInput").style.borderColor = "#ff0000"
            }

            if (passwordDat === "") {
                document.getElementById("passwordInput").style.borderColor = "#ff0000"
            }

            document.getElementById("warning").innerText = "Please fill in all of the fields."
        } else if (passwordDat.length < 7) {
            if (passwordDat === "") {
                document.getElementById("usernameInput").style.borderColor = "##7c7c7c"
                document.getElementById("emailInput").style.borderColor = "##7c7c7c"
                document.getElementById("passwordInput").style.borderColor = "#ff0000"
                document.getElementById("warning").innerText = "Please fill in all of the fields."
            } else {
                document.getElementById("usernameInput").style.borderColor = "##7c7c7c"
                document.getElementById("emailInput").style.borderColor = "##7c7c7c"
                document.getElementById("passwordInput").style.borderColor = "#ff0000"
                document.getElementById("warning").innerText = "Password is too short."
            }
        }
    }
}

socket.on("accountCreated", (token) => {
    console.log(`Account created TOKEN: ${token}`)
    // window.location.href = "../html/login.html"
    console.log("YOU STUPID SERVER")
})

socket.on("usernameInUse", () => {
    document.getElementById("usernameInput").style.borderColor = "#ff0000"
    document.getElementById("emailInput").style.borderColor = "##7c7c7c"
    document.getElementById("warning").innerText = "Username in use."
})

socket.on("emailInUse", () => {
    document.getElementById("usernameInput").style.borderColor = "##7c7c7c"
    document.getElementById("emailInput").style.borderColor = "#ff0000"
    document.getElementById("warning").innerText = "Email in use."
})