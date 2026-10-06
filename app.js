const express = require("express")
const mongoose = require("mongoose")
const app = express();
const initData = require("./init/data.js")
const Listing = require("./models/listing.js")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.engine("ejs" , ejsMate)
app.use(express.static(path.join(__dirname, "public")));

main().then(()=>{
    console.log("connected to Stayora database")
})
.catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Stayora")
}

app.get('/',(req, res)=>{
    res.send("Home route")
})
//Index route
app.get("/home", async (req, res) => {
    let listings = await Listing.find();
    res.render("./listings/index.ejs", {listings})
});

//new route
app.get("/listings/new" ,(req, res)=>{
    res.render("./listings/new")
})

//Show route
app.get("/listings/:id", async(req, res)=>{
    let {id} = req.params
    let list = await Listing.findById(id)
    res.render("./listings/show", {list})
})


//post route
app.post("/listings", async(req, res)=>{
    // let {title, description,image, price ,location, country} = req.body
    // await Listing.create({
    //   title, description,image, price ,location, country  
    // })

    await Listing.create(req.body.listing)
    res.redirect('/home')
})

app.get("/listing/:id/edit", async(req, res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id)
    res.render("./listings/edit.ejs", {listing})
})

app.put("/listings/:id", async(req, res)=>{
     let {id} = req.params
     await Listing.findByIdAndUpdate(id, {...req.body.listing})
     res.redirect("/home")
})

//delete route
app.delete("/listings/:id", async(req, res)=>{
    let {id} = req.params
    await Listing.findByIdAndDelete(id)
    res.redirect('/home')
})
app.listen(9090, ()=>{ 
    console.log("Server running on port 9090")
})