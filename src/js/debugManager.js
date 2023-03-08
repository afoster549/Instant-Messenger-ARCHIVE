const debugFs = require("fs")

class clientDebugger {
    constructor() {
        this.file = "./data/debug.log"
    }

    get data() {
        debugFs.readFile(this.file, "utf-8", (error, text) => {
            if (error) {
                console.log(error)

                return false
            } else {
                return text
            }
        })
    }

    log(data) {
        debugFs.writeFile(this.file, `${new Date().toJSON()}\n${data}\n`, (error) => {
            if (error) {
                console.log(error)

                return true
            } else {
                return false
            }
        })
    }
}

const clientDebug = new clientDebugger()

console.log(clientDebug.data)