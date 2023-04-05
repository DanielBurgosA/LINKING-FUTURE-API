require('dotenv').config();
const { defaults } = require('request');
const { User } = require("../db");
const { ID_CLIENT_GOOGLE, KEY_SECRET_GOOGLE } = process.env;
const { where } = require("sequelize");
const {enviarCorreo} = require("../controllers/NotificationController");
const { log } = require('console');

var GoogleStrategy = require('passport-google-oauth20').Strategy;


module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: ID_CLIENT_GOOGLE,
        clientSecret: KEY_SECRET_GOOGLE,

        callbackURL: "https://pf-api-production.up.railway.app/auth/google/callback"
    },
        async function (accessToken, refreshToken, profile, cb) {
            console.log(profile)
            try {
                const [user, created] = await User.findOrCreate({
                    where: { googleId: profile.id },
                    defaults: {
                        user_name: profile.name.givenName,
                        user_lastname: profile.name.familyName,
                        user_email: profile.emails[0].value,  
                        user_image: profile.photos[0].value 
                    }
                })

                if(created){
                    const mensaje = `Hola ${user.user_name} ${user.user_lastname}, gracias por unirte a nuestra comunidad`
                    enviarCorreo(user.user_email, "¡bienvenido!", mensaje, "createUser")
                }
                
                console.log("pasport");
                cb(null, user)
            } catch (err) {
                cb(err, null)
            }
        }
    ));
}