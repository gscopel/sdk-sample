var express = require('express')
var router = express.Router()
var Yelp = require('yelpv3')

/* GET users listing. */
router.get('/', function(req, res, next) {
  //Search Yelp API based upon term or location
  //Example: http://localhost:3000/yelp?term=coffee
  var term = req.query.term
  //Example: http://localhost:3000/yelp?term=coffee&location=morgantown
  var location = req.query.location

  var yelp = new Yelp({
    app_id: 'apVUI00yvhsBBRES5g0Oug',
    app_secret: 'XERxDzY0pWH4AFGH9vPd0uHwHfroZrQN0iQF71lPpma9p4yZ6tKKXy0uMJ09Bafi'
   })
  yelp.search({term: term, location: location, limit: 10})
   .then(function (data) {
    console.log(data)
    res.json(data)
    return
})
.catch(function (err) {
    console.error(err)
 })
})

module.exports = router
