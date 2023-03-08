let logingIn = false

function submitInfo() {
    socket.emit("login", [document.getElementById("usernameInput").value, document.getElementById("passwordInput").value])
}

socket.on("loginSuccessful", (resData) => {
    if (logingIn == false) {
        logingIn = true

        // Adding data to user.json

        console.log(resData)

        let userRAW = {
            "token": resData[0],
            "id": resData[1]
        }

        let userJSON = JSON.stringify(userRAW)

        fs.writeFile("./data/user.json", userJSON, 'utf8', (error) => {
            if (error) {
                console.log(error)
            }
        })

        window.location.href = "./home.html"
    }
})

socket.on("usernameOrPasswordIncorrect", () => {
    console.log("Username or password incorrect")
})