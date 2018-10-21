const bcrypt = require("bcrypt");
// const crypto = require('crypto')
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
});
/** ****************************************************************** */

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
});
/** ****************************************************************** */

/**
 * User or person schema, will be inherite to studend and teacher schemas
 */
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  birthDate: String,
  birthPlace: String,
  gender: String,
  religion: {
    type: String,
    default: "Islam"
  },
  rt: Number,
  rw: Number,
  kelurahan: String,
  district: String,
  province: String,
  phone: String,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  }
});

// JSON Profile

/** ****************************************************************** */

const accountSchema = new Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    default: "",
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: "Please fill in a username",
    trim: true,
    match: [/^[\w][\w\-\._\@]*[\w]$/, "Please fill a valid username"]
  },
  password: {
    type: String,
    default: "",
    required: "Please fill in a password"
  },
  role: {
    type: Number,
    default: 2
  },
  lastLogin: {
    type: Date
  },
  created: Date
});

/**
 * Helper method for validating user's password.
 */
accountSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

accountSchema.methods.getAccountData = function() {
  return this.email
};

// Password hashing
accountSchema.pre("save", function(next) {
  const account = this;
  const SALT_WORK_FACTOR = 10;
  // only hash the password if it has been modified (or is new)
  if (!account.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(account.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      account.password = hash;
      next();
    });
  });
});

/** ****************************************************************** */
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
  class: Array,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
/** ****************************************************************** */

const studentSchema = new Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
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
});
/** ****************************************************************** */

const subjectSchema = new Schema({
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
});
/** ****************************************************************** */

const School = mongoose.model("School", schoolSchema);
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);
const Classes = mongoose.model("Classes", classSchema);
const Subject = mongoose.model("Subject", subjectSchema);
const Student = mongoose.model("Student", studentSchema);

module.exports = {
  School,
  User,
  Teacher,
  Classes,
  Subject,
  Student,
  Account
};
