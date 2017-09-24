var express = require('express')
var router = express.Router()
var Twitter = require('twitter')

/* GET users listing. */
//Example: http://localhost:3000/twitter/timeline?search=nba
//Timeline functionality
router.get('/:action', function(req, res, next) {
  var actions = ['timeline', 'search']
  var action = req.params.action

  //Conditional used for neccessary authentication of Twitter API Keys.
  if (actions.indexOf(action) == -1){
    res.json({
      confirmation: 'fail',
      message: 'invalid action. please select search or timeline'
    })
    return
  }

  var client = new Twitter({
   consumer_key: 'Un4jkrayL6C2TRniJppLXvNbx',
   consumer_secret: 'GLkmeOg9p0pOaV1EzrCM33jbpyVgagKkSFWUdtzFkFr6Lgm1VM',
   access_token_key: '882419542005350401-HR95d0oTaaEsf1vDMWMAZQ1nuFZ8k33',
   access_token_secret: 'Rp7S7hY3YZEFIBpkrkFJDRJaR6oCL4c4X5dmtbh5mg5Kz'
  })

    if (action == 'timeline'){
      //Custom variable allows uername API endpoint to reach Twitter API
      var username = req.query.username
      var params = {screen_name: username}
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
           console.log(tweets)
        }
        res.json(tweets)
       })
       return
    }


    //Example: http://localhost:3000/twitter/search?term=nba
    //Search functionality
    if (action == 'search'){
      var search = req.query.term
      // SEARCH:
      client.get('search/tweets', {q: search}, function(error, tweets, response) {
         res.json(tweets)
        })
      return
     }
  })

  module.exports = router
