const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@dec register user
//routes post /api/users
//access public
const register = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400).json({msg: "Please fill all the fields"});
        //throw new Error("Please fill all the fields");
    }
    //already a user check
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).json({msg: "User already exists"});
        //throw new Error("User already exists");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await User.create({
        username,
        email,
        password : hashedPassword
    });

    if(newuser){
        res.status(200).json({
            _id: newuser._id,
            username: newuser.username,
            email: newuser.email
        });
    }else{
        res.status(400).json({msg: "Invalid user data"});
        //throw new Error("Invalid user data");
    }
});


//@dec login user
//routes post /api/users
//access public
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        //throw new Error("Please fill all the fields");
    }
    //if user exists
    const user = await User.findOne({email});
    if(!user){
        res.status(400).json({msg: "No User Found"});
        //throw new Error("user dont exists with this email");
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign(
            {
                user : 
                {
                    username: user.username,
                    email: user.email,
                    id : user.id
                } 
            }, 
            process.env.JWT_SECRET, 
            {expiresIn: "1d"}
        );
        res.status(200).json({
            "token" : token
        });

    }else{
        res.status(401).json({msg: "Invalid Credentials"});
        //throw new Error("Invalid credentials");
    }

});


//@dec current user
//routes get /api/users
//access private
const current = asyncHandler(async (req, res) => {
    res.status(200).json({msg: req.user}); 
});

module.exports = {register, login, current};

