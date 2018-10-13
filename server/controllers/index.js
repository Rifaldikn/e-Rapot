const models = require('../models/')

exports.initSchool = (req, res, next) => {
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
    if (count) {
      res.status(409).send({ error: 'School is already exist' })
    } else {
      school.save((err) => {
        if (err) { return next(err) }
        res.json({ status: '200', data: school })
      })
    }
  })
}

exports.createUser = (req, res, next) => {
  const account = new models.User({
    profile: {
      firstname: req.body.firstname,
      lastname: req.body.lastname
    },
    account: {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }
  })

  models.User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      res.status(409).send({ error: 'Account is already exist' })
    }    else {
      account.save((err) => {
      if (err) { return next(err) }
      res.json({ status: '200', account: account })
    })
    }
  })
}
