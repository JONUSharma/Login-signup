const mongoose = require("mongoose")

async function ConnectMongoDb(URL) {
    await mongoose.connect(URL)
        .then(() => console.log("Mongodb connected succesfully on url", URL))
        .catch((err) => console.log(err))
}

module.exports = {
    ConnectMongoDb
}
