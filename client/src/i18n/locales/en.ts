export const en = {
  translation: {
    general: {
      errors: {
        userExistsEmail: 'User with this email exists',
        userExistsLogin: 'User with this login exists',
        wrongData: 'Wrong email or password',
        userNotFound: 'User is not found',
        errorRequest: 'Something went wrong',
        incorrectCode: 'Incorrect code',
        fileExists: 'File with this name exits',
      },
    },
    verify: {
      RegisterVerify: {
        title: 'Verify account on email',
        description:
          'To verify your account, enter the code sent to your e-mail:',
        button: 'Send',
        label: 'Code',
      },
      PasswordForgot: {
        title: 'Password recovery',
        description:
          'Enter your email address and we will send you a password reset email',
        button: 'Send',
        label: 'Email',
      },
      PasswordForgotVerify: {
        title: 'Password recovery verify',
        description:
          'To reset your password, enter the code sent to your email:',
        button: 'Send',
        label: 'Code',
      },
      PasswordForgotReset: {
        title: 'Password recovery reset',
        description: 'Enter a new password',
        button: 'Send',
        label: 'Password',
      },
      GoogleRegister: {
        title: 'Google register',
        description: 'Enter your preferred login',
        button: 'Register',
        label: 'Login',
      },
      validate: {
        code: 'Incorrect code format',
      },
    },
    auth: {
      welcome: 'Welcome',
      google: 'Continue with Google',
      separate: 'OR',
      forgotPassword: 'Forgot password?',
      login: {
        title: 'Login to Storage',
        button: 'Login',
        haveAccount: "Don't have an account?",
        signUp: 'Sign up',
      },
      reg: {
        title: 'Sign up to Storage',
        button: 'Register',
        haveAccount: 'Already have an account?',
        signUp: 'Log in',
      },
      values: {
        email: 'Email',
        password: 'Password',
        firstName: 'First name',
        lastName: 'LastName',
        login: 'Login',
      },
      errors: {
        require: 'The field is required',
        email: 'Incorrect mail',
        min: '{{value}} must contain at least {{count}} characters',
        max: '{{value}} must contain no more than {{count}} characters',
        onlyLetters: 'Only letters',
        onlyLatin: 'Only latin characters',
        onlyLatinSings: 'Only latin characters or sings',
      },
    },
    home: {
      searchPlaceholder: 'Search files',
      save: 'Save',
      header: {
        files: 'Files',
      },
      button: {
        upload: 'Upload',
        create: 'Create',
      },
      file: {
        folder: 'Folder',
      },
      modal: {
        create: 'Enter name',
        rename: 'Rename',
      },
    },
    uploader: {
      header: {
        finish: 'All filed uploaded',
        process: 'Upload',
      },
    },
  },
}
