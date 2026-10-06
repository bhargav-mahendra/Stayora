const mongoose = require("mongoose")

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1790295863363-bc6680b01d7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=>v===" "?"https://images.unsplash.com/photo-1790295863363-bc6680b01d7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D":v
    },
    price:Number,
    location:String,
    country:String
})

const Listing = mongoose.model("Listing", listingSchema)

module.exports = Listing;