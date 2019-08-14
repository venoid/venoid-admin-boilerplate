const Enum = {
  TEXT: 'text',
  PASSWORD: 'password',
  EMAIL: 'email',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
  RADIO: 'radio',

  validate: (type) =>
    [
      Enum.TEXT,
      Enum.PASSWORD,
      Enum.EMAIL,
      Enum.CHECKBOX,
      Enum.SELECT,
      Enum.RADIO
    ].includes(type)
}

export default Object.freeze(Enum)
