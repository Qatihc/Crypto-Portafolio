const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username_lower: {
    type: String,
    unique: true,
    lowercase: true,
    minlength: 3
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    minlength: 6,
  }
})

UserSchema.pre('save', function(next) {

  if (this.modifiedPaths().includes('password')) {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        return next()
      })
    })
  }
  else {
    return next()
  }
});

UserSchema.pre('save', function(next) {
  if (this.modifiedPaths().includes('username')) {
    this.username_lower = this.username.toLowerCase()
  }
  return next()
})

const User = mongoose.model('User', UserSchema);
module.exports = User;