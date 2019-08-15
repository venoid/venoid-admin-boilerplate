import validator from 'validator'

export default class Validator {
  isUsername(value) {
    if (validator.isEmpty(value)) {
      throw new Error('Username must be filed')
    }

    if (!validator.isAlphanumeric(value)) {
      throw new Error('Username must be alphanumeric')
    }

    if (!validator.isLength(value, { min: 4 })) {
      throw new TypeError('Username must be at least 4 chars long')
    }
  }

  isPassword(value) {
    if (validator.isEmpty(value)) {
      throw new Error('Password must be filed')
    }

    if (!validator.isLength(value, { min: 4 })) {
      throw new TypeError('Password must be at least 4 chars long')
    }
  }
}
