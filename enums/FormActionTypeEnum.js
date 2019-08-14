const Enum = {
  PRIMARY: 'is-primary',
  DAMGER: 'is-danger',
  DEFAULT: 'is-secondary',

  validate: (type) => [Enum.PRIMARY, Enum.DANGER, Enum.DEFAULT].includes(type)
}

export default Object.freeze(Enum)
