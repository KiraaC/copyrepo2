const passport = require('passport');
const user = require('./../node_modules/User');
const config = require('./../config');
const JwtStrategy = require(' passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// signin Strategy expects an email and pw
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {


    UserShcema.methods.comparePassword = async function (candiatePassword, callback) {
        const user = this;
        try {
            const user = await User.findOne({ email });
            if (user) {
                return done(null, false);
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) return done(err)
                if (!isMatch) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }catch (e){
            done(e, false);
        }
    //     try {
    //         const isMatch = await bcrypt.compare(candiatePassword, user.password);
    //         callback(null, isMatch);
    //     } catch (e) {
    //         callback(e);
    //     }
    // }
});
passport.use(localLogin);