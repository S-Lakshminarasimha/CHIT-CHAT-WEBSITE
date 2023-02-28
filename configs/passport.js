const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const User = require('../models/userModel')

passport.use(new localStrategy({usernameField:'email',passwordField:'password'},function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            return done(err)
        }
        if(!user || user.password != password){
            return done(null,false)
        }
        return done(null,user)
    })
}))


passport.serializeUser(function(user,done){
    return done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        return done(null,user)
    })
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/login')
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

module.exports = passport