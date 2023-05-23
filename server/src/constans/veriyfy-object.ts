export const getVerifyTypes = (code: number) => ({
  VerifyRegister: {
    subject: 'Подтверждение регистрации',
    html: `<p>Ваш код для верификации аккаунта: ${code}</p>`,
  },
  VerifyPassword: {
    subject: 'Подтверждения сброса пароля',
    html: `<p>Ваш код для подтверждения сброса пароля: ${code}</p>`,
  },
})
