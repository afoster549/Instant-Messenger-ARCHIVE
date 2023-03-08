const errorMessageText = document.getElementById("error_message_description")
const errorMessage = document.getElementById("error_message")

socket.on("serverError", (data) => {
    const type = data[0]
    const message = data[1]
    const errorMessage = data[2]

    if (type === "normal") {
        errorMessage.style.height = "30px"
        errorMessage.style.backgroundColor = "#ed3419"
        errorMessageText.innerText = message
        errorMessageText.style.color = "#FFFFFF"
        errorMessageText.style.fontSize = "20px"
    }

    setTimeout(function() {
        errorMessage.style.height = "0px"
        errorMessageText.style.fontSize = "0px"

        setTimeout(function() {
            errorMessageText.innerText = ""
        }, 150)
    }, (1 * (message.length / 10)) * 1000)
})