// const bcrypt = require('bcrypt-nodejs')
// const crypto = require('crypto')
const mongoose = require('mongoose')
var Schema = mongoose.Schema

const schoolSchema = new Schema(
  {
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
  }
)

const userSchema = new Schema(
  {
    profile: {
        firstname: String,
        lastname: String,
    }
  }

)
const School = mongoose.model('School', schoolSchema)
const User = mongoose.model('User', userSchema)


module.exports = {
  School,
  User
}
