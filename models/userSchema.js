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

const hashPassword = async function(next) {
  try {
    if (this.modifiedPaths().includes('password')) {
      const saltRounds = 10;
      salt = await bcrypt.genSalt(saltRounds)
      hash = await bcrypt.hash(this.password, salt)
      this.password = hash;
    }

/*     if (this.modifiedPaths().includes('username')) {
      this.username_lower = this.username.toLowerCase()
    } */
  } catch(err) {
    return next(err)
  }

  return next()
}

const addLowerUsername = async function(next) {
  try {
    if (this.modifiedPaths().includes('username')) {
      this.username_lower = this.username.toLowerCase()
    }
  } catch (err) {
    return next(err)
  }
}

UserSchema.pre(['save', 'update'], hashPassword);
UserSchema.pre(['save', 'update'], addLowerUsername);

const User = mongoose.model('User', UserSchema);
module.exports = User;