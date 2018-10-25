const models = require('../models/')
/**
 * School Controllers
 */

//  init config school
exports.postSchool = (req, res, next) => {
  const school = new models.School({
    schoolName: req.body.schoolName,
    npsn: req.body.npsn,
    schoolAddress: req.body.schoolAddress,
    zip: req.body.zip,
    phone: req.body.phone,
    kelurahan: req.body.kelurahan,
    district: req.body.district,
    province: req.body.province,
    email: req.body.email,
    website: req.body.website
  })

  models.School.count({}, function (err, count) {
    if (err) {
      return next(err)
    }
    if (count) {
      res.status(409).send({ error: 'School data is already exist' })
    } else {
      school.save(err => {
        if (err) {
          return next(err)
        }
        res.json({ status: '200', data: school })
      })
    }
  })
};
/** ****************************************************************** */
/**
 * Account Controllers
 */

// signup account
exports.postAccount = (req, res, next) => {
  var account = new models.Account({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
    lastLogin: Date.now(),
    created: Date.now(),
    profile: req.body.profile
  })
  console.log()
  models.Account.findOne(
    { email: account.email } || { username: account.username },
    (err, existingUser) => {
      if (err) {
        return next(err)
      }
      if (existingUser) {
        res.status(409).send({ error: 'Account is already exist' })
      } else {
        account.save(err => {
          if (err) {
            return next(err)
          }
          res.json({ status: '200', account: account })
        })
      }
    }
  )
};

// get all account
exports.getAccount = (req, res, next) => {
  // var usersProjection = ;
  models.Account.find(
    {},
    {
      __v: false,
      _id: false,
      password: false
    }
  )
    .populate({
      path: 'profile',
      select: '_id'
    })
    .exec((err, accounts) => {
      if (err) {
        return next(err)
      }
      res.json(accounts)
    })
};

// login account
exports.postLogin = (req, res, next) => {
  models.Account.findOne(
    { email: req.body.email } || { username: req.body.email },
    (err, account) => {
      if (err) {
        return next(err)
      }
      if (!account) {
        return next(null, false, { msg: `Email ${email} not found.` })
      }
      account.comparePassword(req.body.password, (err, isMatch) => {
        if (err) {
          return next(err)
        }
        if (isMatch) {
          req.session.account = account
          return next(account)
        }
        return next({ msg: 'Invalid email or password.' })
      })
    }
  )
};
/** ****************************************************************** */
/**
/**
 * User Controllers
 */
// create user profile
exports.postUser = (req, res, next) => {
  console.log(req.body)
  var user = new models.User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthDate: req.body.birthDate,
    birthPlace: req.body.birthPlace,
    gender: req.body.gender,
    religion: req.body.religion,
    rt: req.body.rt,
    rw: req.body.rw,
    kelurahan: req.body.kelurahan,
    district: req.body.distrct,
    province: req.body.province,
    phone: req.body.phone,
    account: req.body.accountId
  })
  if (req.body.accountId) {
    models.Account.findOne({ _id: req.body.accountId }, (err, account) => {
      if (err) {
        return next(err)
      } else {
        account.set({ profile: user._id })
        account.save(function (err, updatedAccount) {
          if (err) return next(err)
          res.send(updatedAccount)
        })
      }
    })
  } else {
    user.save(err => {
      if (err) {
        return next(err)
      }
      res.json({ status: '200', user: user })
    })
  }
}
/** ****************************************************************** */
/**
/**
 * User Controllers
 */

exports.postTeacher = (req, res, next) => {
  const teacher = new models.Teacher({
    nip: req.body.nip,
    nik: req.body.nik,
    nuptk: req.body.nuptk,
    status: req.body.status,
    subject: req.body.subject,
    class: req.body.class,
    profile: req.body.profileId
  })

  models.Teacher.findOne(
    { nip: req.body.nip } || { nik: req.body.nik } || {
      nuptk: req.body.nuptk
    } || { profile: req.body.profileId },
    (err, existingTeacher) => {
      if (err) {
        return next(err)
      }
      if (existingTeacher) {
        res.status(409).send({ error: 'Teacher is already exist' })
      } else {
        teacher.save(err => {
          if (err) {
            return next(err)
          }
          res.json({ status: '200', teacher: teacher })
        })
      }
    }
  )
};
/** ****************************************************************** */
/**
/**
 * Student Controllers
 */

//  post Student - create new student
exports.postStudent = (req, res, next) => {
  const student = new models.Student({
    profile: req.body.profileId,
    name: req.body.firstname + ' ' + req.body.lastname,
    nisn: req.body.nisn,
    nik: req.body.nik,
    childStatus: req.body.childStatus,
    childTh: req.body.childTh,
    schoolsFrom: req.body.schoolsFrom,
    class: req.body.class,
    dateIn: req.body.dateIn,
    parent: {
      father: {
        name: req.body.father.name,
        works: req.body.father.works,
        phone: req.body.father.phone,
        address: req.body.father.address
      },
      mother: {
        name: req.body.mother.name,
        works: req.body.mother.works,
        phone: req.body.mother.phone,
        address: req.body.mother.address
      }
    },
    wali: {
      name: req.body.wali.name,
      works: req.body.wali.works,
      phone: req.body.wali.phone,
      address: req.body.wali.address
    }
  })

  models.Student.findOne(
    { nisn: req.body.nisn } || { nik: req.body.nik },
    (err, existingStudent) => {
      if (err) {
        return next(err)
      }
      if (existingStudent) {
        res.status(409).send({ error: 'Student is already exist' })
      } else {
        student.save(err => {
          if (err) {
            return next(err)
          }
          res.json({ status: '200', student: student })
        })
      }
    }
  )
};

/** ****************************************************************** */
/**
/**
 * Subject Controllers
 */

//  create new subject/matapelajaran
exports.postSubject = (req, res, next) => {
  const subject = new models.Subject({
    name: req.body.subjectName,
    passGrade: req.body.passGrade
  })

  models.Subject.findOne(
    { name: req.body.subjectName },
    (err, existingSubject) => {
      if (err) {
        return next(err)
      }
      if (existingSubject) {
        res.status(409).send({ error: 'Subject is already exist' })
      } else {
        subject.save(err => {
          if (err) {
            return next(err)
          }
          res.json({ status: '200', subject: subject})
        })
      }
    }
  )
};
