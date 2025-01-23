const User = require('../models/User')
const router = require('express').Router()
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// REGISTER
router.post("/register", async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })
    try{
        const saveUser = await newUser.save()
        res.status(201).json(saveUser)
    }catch(err){
        res.status(500).json(err)
    }
})

// LOGIN
router.post('/login', async(req, res) => {
    try {      
        let user;
        try {
            user = await User.findOne({ username: req.body.username })
            if (!user) {
                return res.status(401).json({ error: "User not found!" }); 
            }
        } catch(err) {
            return res.status(401).json(err); 
        }

        let hashedPassword;
        try {
            hashedPassword =  CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)
            if (hashedPassword !== req.body.password) {
                return res.status(401).json({ error: "Wrong password!" }); 
            }
        } catch(err) {
            return res.status(401).json(err); 
        }

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SEC, { expiresIn: "3d"})
        console.log(user.isAdmin)

        const { password, ...others } = user._doc; 
        res.status(200).json({ ...others, accessToken });
    } catch(err) {
        res.status(500).json(err); 
    }
})

module.exports = router;