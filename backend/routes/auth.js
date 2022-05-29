const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'Mahimaisagood$irl';
//jwt.io for jsonwebtoken



// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async(req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    const success = false;
    if (!errors.isEmpty()) {
        return res, res.status(400).json({ success: success, error: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success: success, error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        //console.log({ authToken });

        //res.json(user);
        res.status(200).json({ success: true, authToken })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: success, error: "Internal Server Error" })

    }
    /* .then(user => res.json(user))
        .catch(err => {
            console.log(err)
            res.json({ errMsg: err.message })
        }); */
    //const user = User(req.body);
    //user.save();


})

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async(req, res) => {
    //if there are errors return Bad request and errors
    const errors = validationResult(req);
    const success = false;
    if (!errors.isEmpty()) {
        return res, res.status(400).json({ success: success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: success, error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success: success, error: "Please try to login with correct credentials" });

        }
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authToken })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: success, error: "Internal server error" });

    }
})

// ROUTE 3: Get user details using: POST "/api/auth/getuser". Login required
router.get('/getuser', fetchuser, async(req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        //console.log("user=",user)
        //console.log("name:",user.name)
        res.send(user)

    } catch (error) {
        console.log(err.message);
        res.status(500).send("Internal server error");

    }


})








module.exports = router;