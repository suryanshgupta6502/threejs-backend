const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()



const app = express()
app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log("connected");
    }).catch((err) => {
        console.log("error in coneciton", err);
    })
const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })


console.log(time);

const userschema = new mongoose.Schema({
    name: {
        type: String,
    },
    time: {
        type: String
    },
    intialwebsite: {
        type: String
    },
    userTimezone: {
        type: String
    },
    device: {
        type: String
    },
    rawData: {
        type: Array
    }
}, {
    timestamps: {
        createdAt: new Date().toString(),
        updatedAt: false
    }
}
)


const usermodal = mongoose.model("donutWorld", userschema)


app.post('/donutWorld', async (req, res) => {
    // console.log(req.rawHeaders);
    const { name, device, intialwebsite, usertimezone } = req.body;
    // console.log(req.rawHeaders);

    const user = await usermodal({
        name: name,
        time: time,
        intialwebsite: intialwebsite,
        userTimezone: usertimezone,
        device: device,
        rawData: req.rawHeaders
    }).save()

    // console.log(user);
    res.send("donut world")
})





app.listen(process.env.PORT || 3000)