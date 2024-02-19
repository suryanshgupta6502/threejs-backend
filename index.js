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

const userschema = new mongoose.Schema({
    name: {
        type: String,
        require
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


const usermodal = mongoose.model("donutWorld/User", userschema)


app.post('/donutWorld', async (req, res) => {
    // console.log(req.rawHeaders);
    const { name, device } = req.body;
    const user = await usermodal({ name: name, device: device, rawData: req.rawHeaders }).save()
    // console.log(user);
    res.send("donut world")
})





app.listen(process.env.PORT||3000)