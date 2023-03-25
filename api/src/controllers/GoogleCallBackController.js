
const { issueJWT } = require("../authWithJWT/utils")

const GoogleCallBackController = (req, res, next) => {
    // Successful authentication, redirect home.
    const token = issueJWT(req.user);
  
    res.cookie("value", token.token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
    res.cookie("success", "true", { httpOnly: true, maxAge: 500000000 }) 

    res.redirect('http://localhost:3000/home');
}

module.exports = { GoogleCallBackController }
