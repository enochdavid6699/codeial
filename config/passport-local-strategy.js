const { request } = require('express');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


//Authentication using Passport(Old Way)

// passport.use(new LocalStrategy({
//         usernameField: 'email'
//     },
//     function(email , password , done){
//         //Find a user and establish Identity
//         User.findOne({email:email} , function(err , user){
//             if(err){
//                 console.log('Error in finding user --> Passport');
//                 return done(err);
//             }
//             if(!user || user.password != password){
//                 console.log('Invalid Username Password');
//                 return done(null , false);
//             }

//             return done(null , user);
//         });
//     }
// ));

//Authentication Using Passport (New Way)
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    async function(req , email , password , done){
        //Find a user and establish Identity
        let user = await User.findOne({email:email});

        if(!user || user.password != password){
            console.log('Invalid Username Password');

            req.flash('error' , 'Invalid Username/Password');

            return done(null , false);
        }
            return done(null , user);
        }
));

//Serializing the user to decide which key to be kept in the cookies
passport.serializeUser(function(user , done){
    done(null , user.id);
});


//De-serializing th user from key in the cookies (Old Way)

// passport.deserializeUser(function(id , done){
//     User.findById(id , function(err , user){
//         if(err){
//             console.log('Error in finding user --> Passport');
//             return done(err);
//         }
//         done(null , user);
//     });
// });

//De-serializing th user from key in the cookies (New Way)
passport.deserializeUser(async function(id , done){
    let user = await User.findById(id);     
    done(null , user);
});

//Check if the user is Authenticated
passport.checkAuthentication = function(req , res , next){

    //If user is signed in then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //If user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req , res , next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
