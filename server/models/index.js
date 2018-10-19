// const bcrypt = require('bcrypt-nodejs')
// const crypto = require('crypto')
const mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * School schema, to save information and configutration about school
 */
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

/**
 * Class schema to save information about class, student in it
 */
const classSchema = new Schema({
  grade: String,
  major: String,
  classId: Number,
  homeroomTeacher: String,
  students: {
    type: Array,
    default: []
  },
  teachers: {
    type: Array,
    default: []
  }
})

/**
 * User or person schema, will be inherite to studend and teacher schemas
 */
const userSchema = new Schema({
  profile: {
    firstname: String,
    lastname: String,
    birthDate: String,
    birthPlace: String,
    gender: String,
    religion: {
      type: String,
      default: 'islam'
    },
    rt: Number,
    rw: Number,
    kelurahan: String,
    district: String,
    province: String,
    phone: String
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
      picture: { type: String }
    },
    role: {
      type: Number,
      default: 3
    },
    lastLogin: {
      type: Date
    },
    created: Date,
    locale: {
      type: String
    },
    status: {
      type: Number,
      default: 1
    }
  }
})

/**
 * Teacher schema
 */
const teacherSchema = new Schema({
  nip: Number,
  nik: Number,
  nuptk: Number,
  status: String,
  subject: String,
  status: String,
  class: Array
})

const studentSchema = new Schema({
  nisn: Number,
  nik: Number,
  childStatus: String,
  childTh: Number,
  schools: {
    type: Array,
    default: []
  },
  class: String,
  dateIn: Date,
  parent: {
    father: {
      name: String,
      works: String,
      phone: String,
      address: String
    },
    motherName: {
      name: String,
      works: String,
      phone: String,
      address: String
    }
  },
  wali: {
    name: String,
    works: String,
    phone: String,
    phone: String,
    address: String
  }
})

const subjecSchema = new Schema({
  name: String,
  teachers: {
    type: Array,
    default: []
  },
  classes: {
    type: Array,
    default: []
  },
  passGrade: Number
})

const School = mongoose.model('School', schoolSchema)
const User = mongoose.model('User', userSchema)
const Teacher = mongoose.model('Teacher', teacherSchema)
const Classes = mongoose.model('Classes', classSchema)
const Subject = mongoose.model('Subject', subjecSchema)
const Student = mongoose.model('Student', studentSchema)

module.exports = {
  School,
  User,
  Teacher,
  Classes,
  Subject,
  Stundet
}
