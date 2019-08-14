const Enum = {
  TEXT: 'text',
  PASSWORD: 'password',
  EMAIL: 'email',

  validate: (type) => [Enum.TEXT, Enum.PASSWORD, Enum.EMAIL].includes(type)
}

export default Object.freeze(Enum)
