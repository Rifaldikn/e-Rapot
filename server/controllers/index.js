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

  models.Account.findOne(
    { email: req.body.email } || { username: req.body.email },
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

exports.postUser = (req, res, next) => {
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
  }
  user.save(err => {
    if (err) {
      return next(err)
    }
    res.json({ status: '200', user: user })
  })
};
