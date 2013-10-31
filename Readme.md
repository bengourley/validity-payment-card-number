# validity-payment-card-number

[![Build Status](https://travis-ci.org/bengourley/validity-payment-card-number.png?branch=master)](https://travis-ci.org/bengourley/validity-payment-card-number)

Validity style validator to validate payment card numbers with the luhn algorithm.
Defers the [luhn](https://npmjs.org/package/luhn) module for the validity check and
prevents the use of test credit card numbers.

Note that this validity check only ensures that the credit card *might* be
valid based on the pattern of digits (as opposed to a random string). See
[the Wikipedia article on the Luhn algorithm](http://en.wikipedia.org/wiki/Luhn_algorithm)
for more info.

## Installation

    npm install validity-payment-card-number

## Usage

Below is a simple example for usage with schemata and save:

```js
var validity = require('validity')
  , schemata = require('schemata')
  , save = require('save')
  , collection = save('paymentMethod')
  , createCardValidator = require('validity-payment-card-number')

var schema = schemata(
    { cardNumber:
      { type: String
      , validators: { all: [ validity.required, createCardValidator() ] }
      }
    })
```

## API

### var validate = createCardValidator(Boolean: allowTestCards)

Create a validate function. `allowTestCards` is used by the tests (because I'm not
putting my valid card numbers in this repo!). Although payment will fail if used,
You should obviously not set this when validating real card numbers in case
someone sneakily tries to use a test card number.

### validate(String:key, String:keyDisplayName, Object:object, Function:cb)

This is a validity compatible function, which in turn is used by schemata for schema validation.

The callback signature cb(err, errorMessage).

err is an Error object if something bad happened and null otherwise.
errorMessage is a String if a validation error happened and undefined otherwise.

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)