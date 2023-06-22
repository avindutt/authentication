const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile');
}

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Sign-In'
    });
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Sign-Up'
    });
}

module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    const user = await User.findOne({email: req.body.email});

        if(!user){
            const newUser = await User.create(req.body);

            return res.redirect('/user/sign-in');
        }else{
            return res.redirect('back');
        }

}

module.exports.createSession = async function(req, res){

    // find the user
    const user = await User.findOne({email: req.body.email});

    // handle user found
    if(user){
        // when passwords doesn't match
        if(user.password != req.body.password){
            return res.redirect('back');
        }

        // creating the session
        res.cookie('user_id', user.id);
        return res.redirect('/user/profile');

    }else{
        // when user is not found
        return res.redirect('back');
    }

}