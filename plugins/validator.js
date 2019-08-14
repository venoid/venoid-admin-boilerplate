import validator from 'validator'

export default (ctx, inject) => {
  inject('validator', {
    isUsername(value) {
      if (validator.isEmpty(value)) {
        throw new Error('Username must be filed')
      }

      if (!validator.isAlphanumeric(value)) {
        throw new Error('Username must be alphanumeric')
      }

      if (!validator.isLength(value, { min: 5 })) {
        throw new TypeError('Username must be at least 5 chars long')
      }
    },
    isPassword(value) {
      if (validator.isEmpty(value)) {
        throw new Error('Password must be filed')
      }
    }
  })
}
