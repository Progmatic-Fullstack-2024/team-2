import * as Yup from 'yup';

export const userValidationSchemaForLogin = Yup.object({
  email: Yup.string().email('Valós emailt adj meg!').required('Email megadása kötelező!'),
  password: Yup.string()
    .min(6, 'A jelszónak minimum 6 karakternek kell lennie')
    .required('A jelszó megadása kötelező!'),
});

export const userValidationSchemaForRegistration = Yup.object({
  firstName: Yup.string().required('A keresztnév megadása kötelező!'),
  lastName: Yup.string().required('A vezetéknév megadása kötelező!'),
  email: Yup.string().email('Valós emailt adj meg!').required('Email megadása kötelező!'),
  phone: Yup.string()
    .matches(
      /^\+?[0-9]{10,15}$/,
      'Adj meg egy érvényes telefonszámot (10-15 számjegy, opcionális + előjellel)!',
    )
    .notRequired(),
  password: Yup.string()
    .min(6, 'A jelszónak minimum 6 karakternek kell lennie')
    .required('A jelszó megadása kötelező!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'A jelszavak nem egyeznek!')
    .required('A jelszó megerősítése kötelező!'),
});


export const userValidationSchemaForUpdateUser = Yup.object({
  firstName: Yup.string().required('A keresztnév megadása kötelező!'),
  lastName: Yup.string().required('A vezetéknév megadása kötelező!'),
  email: Yup.string().email('Valós emailt adj meg!').required('Email megadása kötelező!'),
  phone: Yup
    .string()
    .matches(
      /^\+?[0-9]{10,15}$/,
      'Adj meg egy érvényes telefonszámot (10-15 számjegy, opcionális + előjellel)!',
    )
    .notRequired(),
});

export const userValidationSchemaForPassword = Yup.object({
  oldPassword: Yup
    .string()
    .min(6, 'A jelszónak minimum 6 karakternek kell lennie')
    .required('A régi jelszó megadása kötelező!'),
  newPassword: Yup
    .string()
    .min(6, 'A jelszónak minimum 6 karakternek kell lennie')
    .required('Az új jelszó megadása kötelező!'),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('newPassword')], 'A jelszavak nem egyeznek!')
    .required('Az új jelszó megerősítése kötelező!'),
});
