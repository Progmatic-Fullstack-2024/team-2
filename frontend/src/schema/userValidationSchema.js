import * as yup from 'yup';

export const userValidationSchemaForLogin = yup.object({
  email: yup.string().email('Valós emailt adj meg!').required('Email megadása kötelező!'),
  password: yup
    .string()
    .min(6, 'A jelszónak minimum 6 karakternek kell lennie')
    .required('A jelszó megadása kötelező!'),
});

export const userValidationSchemaForRegistration = yup.object({
  firstName: yup.string().required('A keresztnév megadása kötelező!'),
  lastName: yup.string().required('A vezetéknév megadása kötelező!'),
  email: yup.string().email('Valós emailt adj meg!').required('Email megadása kötelező!'),
  phone: yup
    .string()
    .matches(
      /^\+?[0-9]{10,15}$/,
      'Adj meg egy érvényes telefonszámot (10-15 számjegy, opcionális + előjellel)!',
    )
    .notRequired(),
  password: yup
    .string()
    .min(6, 'A jelszónak minimum 6 karakternek kell lennie')
    .required('A jelszó megadása kötelező!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'A jelszavak nem egyeznek!')
    .required('A jelszó megerősítése kötelező!'),
});

export const userValidationSchemaForUpdateUser = yup.object({
  firstName: yup.string().required('A keresztnév megadása kötelező!'),
  lastName: yup.string().required('A vezetéknév megadása kötelező!'),
  email: yup.string().email('Valós emailt adj meg!').required('Email megadása kötelező!'),
  phone: yup
    .string()
    .matches(
      /^\+?[0-9]{10,15}$/,
      'Adj meg egy érvényes telefonszámot (10-15 számjegy, opcionális + előjellel)!',
    )
    .notRequired(),
});

export const userValidationSchemaForPassword = yup.object({
  oldPassword: yup
    .string()
    .min(6, 'A jelszónak minimum 6 karakternek kell lennie')
    .required('A régi jelszó megadása kötelező!'),
  newPassword: yup
    .string()
    .min(6, 'A jelszónak minimum 6 karakternek kell lennie')
    .required('Az új jelszó megadása kötelező!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'A jelszavak nem egyeznek!')
    .required('Az új jelszó megerősítése kötelező!'),
});
