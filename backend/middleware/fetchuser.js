var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Mahimaisagood$irl';


const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to req object

    const token = req.header('auth-token');
    if (!token) {
        console.log("in 1");
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.log("in 2");
        res.status(401).send({ error: "Please authenticate using a valid token" })

    }

}

module.exports = fetchuser;