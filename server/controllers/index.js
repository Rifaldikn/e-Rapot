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
      res.json({ status: '302', msg: 'already registered'})
    } else {
      school.save((err) => {
        if (err) { return next(err) }
        res.json({ status: '200', data: school })
      })
    }
  })
}

exports.createuser(req, res, next){
  
}
