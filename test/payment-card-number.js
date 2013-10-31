var createValidator = require('../')
  , assert = require('assert')
  , cards = require('./fixtures')
  , async = require('async')

/* global describe, it */

describe('Payment card number validator', function () {

  it('should provide an error message if the property is not a string (obj)', function (done) {

    createValidator()('num', 'card number', { num: {} }, function (err, message) {
      assert(!err)
      assert(message)
      done()
    })

  })

  it('should provide an error message if the property is not a string (bool)', function (done) {

    createValidator()('num', 'card number', { num: false }, function (err, message) {
      assert(!err)
      assert(message)
      done()
    })

  })

  it('should provide an error message if the property is not a string (array)', function (done) {

    createValidator()('num', 'card number', { num: [] }, function (err, message) {
      assert(!err)
      assert(message)
      done()
    })

  })

  it('should provide an error message if the property is not a string (num)', function (done) {

    createValidator()('num', 'card number', { num: 1238023944 }, function (err, message) {
      assert(!err)
      assert(message)
      done()
    })

  })

  it('should not provide an error message if the card number is valid', function (done) {

    var validate = createValidator(true) // Setting the allow test cards parameter

    function check(num, cb) {
      validate('num', 'card number', { num: num }, function (err, message) {
        assert(!err)
        assert(!message)
        cb(err || message)
      })
    }

    async.each(cards.valid, check, done)

  })

  it('should provide an error message if a test card is used', function (done) {

    var validate = createValidator()

    function check(num, cb) {
      validate('num', 'card number', { num: num }, function (err, message) {
        assert(!err)
        assert(message)
        cb(!message)
      })
    }

    async.each(cards.valid, check, done)

  })

  it('should provide an error message if the card number is invalid', function (done) {

    var validate = createValidator()

    function check(num, cb) {
      validate('num', 'card number', { num: num }, function (err, message) {
        assert(!err)
        assert(message)
        cb(!message)
      })
    }

    async.each(cards.invalid, check, done)

  })

})