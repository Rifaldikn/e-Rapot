// const bcrypt = require('bcrypt-nodejs')
// const crypto = require('crypto')
const mongoose = require('mongoose')
var Schema = mongoose.Schema

const schoolSchema = new Schema({
  schoolName: String,
  npsn: Number,
  schoolAddress: String,
  zip: Number,
  phone: Number,
  kelurahan: String,
  district: String,
  province: String,
  email: String,
  website: String
})

const userSchema = new Schema({
  profile: {
    firstname: String,
    lastname: String
  },
  account: {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      default: '',
      match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: 'Please fill in a username',
      trim: true,
      match: [/^[\w][\w\-\._\@]*[\w]$/, 'Please fill a valid username']
    },
    password: {
      type: String,
      default: '',
      required: 'Please fill in a password'
    },
    profile: {
      name: { type: String },
      gender: { type: String },
      picture: { type: String },
      location: { type: String }
    },
    roles: {
      type: [
        {
          type: String,
          enum: ['admin', 'teacher', 'student']
        }
      ],
      default: ['student']
    },
    lastLogin: {
      type: Date
    },

    locale: {
      type: String
    },
    status: {
      type: Number,
      default: 1
    }
  }
})

const School = mongoose.model('School', schoolSchema)
const User = mongoose.model('User', userSchema)

module.exports = {
  School,
  User
}
