const User = require('../models/userModel')

module.exports.login = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile')
    }
    return res.render('Login')
}

module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile')
    }
    return res.render('Signup')
}

module.exports.profile = function(req,res){
    res.render('Profile')
}

// create Account for user
module.exports.createAccount = function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            return console.log("Error finding user !!",err)
        }

        if (!user){
            User.create({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            })
            return res.redirect('/login')
        }
        return res.redirect('/login')
    })
}

module.exports.createSession = function(req,res){
    return res.redirect('/login/profile')
}



module.exports.logout = function(req,res){
    req.logout(function(err){
        if(err){
            return console.log('error while logging off')
        }
        res.redirect('/')
    })
    res.clearCookie("user",{path:'/'})
}