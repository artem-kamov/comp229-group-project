let User = require('../models/user');
let Product = require('../models/product');
let config = require('../config/config');
let jwt = require('jsonwebtoken');
let { expressjwt } = require('express-jwt');

//sign-in 
module.exports.signin = async function (req, res, next) {
    try {
        let user = await User.findOne({ "email": req.body.email })
        if (!user)
            throw new Error('User not found');
        if (!user.authenticate(req.body.password))
            throw new Error("Email and/or password don't match.");

        // Issue the token
        let payload = {
            id: user._id,
            username: user.username
        }

        let token = jwt.sign(payload, config.SECRETKEY,
            {
                algorithm: 'HS512',
                expiresIn: "20min"
            });

        // Send the token to the client
        return res.json(
            {
                success: true,
                token: token
            }
        );

    } catch (error) {
        console.log(error);
        next(error)
    }
}

// Checks the token validation
module.exports.requireSignin = expressjwt({
    secret: config.SECRETKEY,
    algorithms: ['HS512'],
    userProperty: 'auth' 
})

// Checks if the requester is allowed to perform the action.
module.exports.hasAuthorization = async function (req, res, next) {
    let authorized = req.auth && req.user && req.user.username == req.auth.username

    if (!(authorized)) {
        return res.status('403').json(
            {
                success: false,
                message: "User is not authorized"
            }
        )
    }
    next()
}

// Validates the owner of the item.
exports.isAllowed = async function (req, res, next){
    try {
        let id = req.params.id
        let productItem = await Product.findById(id).populate('owner');   
        
        // If there is no item found.
        if(productItem == null){
            throw new Error('Item not found.') // Express will catch this on its own.
        }
        else if(productItem.owner != null){ // If the item found has a owner.
  
            if(productItem.owner._id != req.auth.id){ // If the owner differs.
                
                let currentUser = await User.findOne({_id: req.auth.id}, 'admin');
  
                if(currentUser.admin != true){ // If the user is not a Admin
                
                    return res.status(403).json(
                        { 
                            success: false, 
                            message: 'User is not authorized to modify this listing.'
                        }
                    );
                }
            }        
        }
  
        // If it reaches this point, runs the next middleware.
        next();    
    } catch (error) {
        console.log(error);
        return res.status(400).json(
            { 
                success: false, 
                message: error.message
            }
        );
    }
    
  }