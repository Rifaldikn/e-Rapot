const SchoolModel = require('../models/')

exports.initSchool = (req, res, next) => {
  const school = new SchoolModel({
    schoolName: req.body.schoolName,
    npsn: req.body.npsn,
    address: req.body.address,
    district: req.body.district,
    city: req.body.city,
    province: req.body.province,
    website: req.body.website,
    email: req.body.email

  })
  SchoolModel.count({}, function (err, count) {
    if (count) {
      res.json({ status: '302', msg: "already registered"})
    } else{
      school.save((err) => {
   if (err) { return next(err) }
   res.json({ status: '200', data: school })
 })
    }
  })
}
