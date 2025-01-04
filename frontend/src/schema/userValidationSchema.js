import * as yup from 'yup';

export const userValidationSchemaForLogin = yup.object({
  email: yup.string().email('Valós emailt adj meg!').required('Email megadása kötelező!'),
  password: yup
    .string()
    .min(6, 'A jelszónak minimum 6 karakternek kell lennie')
    .required('A jelszó megadása kötelező!'),
});

export const userValidationSchemaForRegistration = yup.object({
  firstName: yup.string().required('Írj nevet'),
  lastName: yup.string().required('Írj nevet'),
  email: yup.string().email('Valós emailt adj meg!').required('Email megadása kötelező!'),
  password: yup
    .string()
    .min(6, 'A jelszónak minimum 6 karakternek kell lennie')
    .required('A jelszó megadása kötelező!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'A jelszavak nem egyeznek!')
    .required('A jelszó megerősítése kötelező!'),
});
