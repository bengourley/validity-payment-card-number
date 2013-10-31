module.exports = createValidator

var luhn = require('luhn').luhn
  , testCards = require('./test-cards')

function createValidator(allowTestCards) {

  function validate(key, keyDisplayName, object, cb) {

    var num = object[key]

    // Luhn module assumes string, so exit early if num is anything else
    if (typeof num !== 'string') return cb(null, keyDisplayName + ' is not valid')

    // Validate with the luhn algorithm
    if (!luhn.validate(num)) return cb(null, keyDisplayName + ' is not valid')

    // Prevent test cards from being using in normal use
    if (!allowTestCards) {
      if (testCards.indexOf(num) !== -1) return cb(null, keyDisplayName + ' is not valid')
    }

    // Success!
    cb(null, undefined)

  }

  return validate

}