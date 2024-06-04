require('dotenv').config()
const PORT = process.env.PORT || 5000

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')


app.use(express.json())
app.use(cors())


//Database Connection with mongoDB
mongoose.connect('mongodb+srv://tamil:070707@cluster0.vh4znhz.mongodb.net/ecomm')

app.get('/', (req,res)=>{
    res.send('I am get method')
})

// Image storage engine

const storage = multer.diskStorage({
    destination : './upload/images',
    filename : (req, file, cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
    
const upload = multer({storage : storage})

//creating upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'),(req,res)=>{
    res.json({
        success : 1,
        image_url : `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

// Schema for creating products
const Product = mongoose.model('Product', {
    id:{
        type : Number,
        required:true,
    },
    name : {
        type : String,
        required:true,
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    new_price : {
        type : Number,
        required : true
    },
    old_price : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    available : {
        type : Boolean,
        default : true
    }
})

app.post('/addproduct', async(req,res)=>{
    let products = await Product.find({})
    let id;
    if(products.length > 0){
        let lastProductArray = products.slice(-1)
        let lastProduct = lastProductArray[0]
        id = lastProduct.id+1
    }else{
        id = 1
    }
    const product = new Product({
        id : id,
        name : req.body.name,
        image : req.body.image,
        category : req.body.category,
        new_price : req.body.new_price,
        old_price : req.body.old_price
    })
    console.log(product);
    await product.save()
    console.log('Product Saved');
    res.json({
        success : true,
        name : req.body.name
    })
})

//Creating api for deleting products
app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id : req.body.id})
    console.log('Product removed successfully');
    res.json({
        success : true,
        name : req.body.name
    })
})

//Creating api for getting all products
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find()
    console.log("All product fetched");
    res.send(products)
})

//Schema creating for usermodel
const Users = mongoose.model('Users',{
    name : {
        type : String
    },
    email : {
        type : String,
        unique : true
    },

    password :{
        type : String,
    },
    cartData : {
        type:Object,
    },
    date : {
        type : Date,
        default : Date.now
    }
})

//Creating endpoint for registering the user

app.post('/signup', async(req, res)=>{
    let check = await Users.findOne({email : req.body.email})
    if(check){
        return res.status(400).json({success : false, error : 'Existing user found using same email id'})
    }
    let cart = {}
    for(let i=1; i<=300; i++){
        cart[i] = 0
    }
    const user = new Users({
        name : req.body.username,
        email : req.body.email,
        password : req.body.password,
        cartData : cart
    })
    await user.save()

    const data = {
        user : {
            id : user.id
        }
    }
    const token = jwt.sign(data, '10')
    res.json({success : true, token})
    
})

// creating endpoint for user login
app.post('/login', async(req, res)=>{
    let user = await Users.findOne({email : req.body.email})
    if(user){
        const passCompare = req.body.password === user.password
        if(passCompare){
            const data = {
                user : {
                    id : user.id
                }
            }
            const token = jwt.sign(data, '10')
            res.json({success : true, token})
        }
        else{
            res.json({success : false, errors : "Enter correct password"})
        }
    }else{
        res.json({success : false, errors : "Enter correct email id"})
    }
})

//Creating endpoint for newcollection data

app.get("/newCollections", async(req,res)=>{
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    console.log('New collection fetched');
    res.send(newcollection)
})

//Creating endpoint for popular in women category

app.get('/popularinwomen', async(req,res)=>{
    let products = await Product.find({category : 'women'})
    let popular_inwomen = products.slice(0,4)
    console.log("popular in women fetched");
    res.send(popular_inwomen)
})

//Creating middleware to fetch user
    const fetchUser = async(req,res,next)=>{
        const token = req.header('auth-token')
        if(!token){
            res.status(401).send({errors:"Please authenticate using valid token"})
        }else{
            try{
                const data = jwt.verify(token,'10');
                req.user = data.user;
                next()
            }catch (error){
                res.status(401).send({errors : "please authenticate using a valid token"})
            }
        }
    }

//Creating endpoints for adding products in cartdata
app.post('/addtocart',fetchUser, async(req,res)=>{
    console.log("Added", req.body.itemId);
    let userData= await Users.findOne({_id : req.user.id})
    userData.cartData[req.body.itemId] += 1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added")
})

//Creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser, async(req,res)=>{
    console.log("Removed", req.body.itemId);
    let userData= await Users.findOne({_id : req.user.id})
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed")
})

//Creating endpoint to get cartdata
app.post('/getcart', fetchUser, async(req,res)=>{
    console.log("Getcart");
    let userData = await Users.findOne({_id : req.user.id})
    res.json(userData.cartData)
})

//Api Creation
app.listen(PORT, (err)=>{
    if(!err){
        console.log(`Server running in http://localhost:${PORT}`)
    }else{
        console.log('Some error occured in api creation')
    }
})
