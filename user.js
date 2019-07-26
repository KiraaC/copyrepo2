// kira copy
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Validatior = require('validator');
const validateEmail = function (email) {
    return validator.isEmail(email);
};
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase:true,
        validate:[]

    },
    password: {
        type: String,
        required: true
    }
});
UserSchema.pre('save', async function(next){
    const user = this;
    try {
      const salt = await bcrypt.genSalt();
      console.log('salt', salt);
      const hash = await bcrypt.hash(user.password, salt);
      console.log('hash', hash);
      user.password = hash;
      next();
    } catch(e) {
      return next(err);
    }
  });
  
  UserSchema.methods.comparePassword = async function(candidatePassword, callback){
    const user = this;
    try {
      const isMatch = await bcrypt.compare(candidatePassword, user.password);
      callback(null, isMatch);
    } catch(err) {
      callback(err);
    }
  };
  
  const User = mongoose.model('User', UserSchema);
  
  module.exports = User;