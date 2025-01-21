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

export const performanceValidationSchema = Yup.object({
  title: Yup.string()
    .required('Előadás neve szükséges.')
    .min(3, 'Az előadás neve legalább 3 karakter hosszú kell legyen.'),
  theaterId: Yup.string().required('Színház azonosító szükséges.'),
  creatorId: Yup.array()
    .of(Yup.string().required('Minden alkotó azonosító megadása kötelező.'))
    .min(1, 'Legalább egy alkotó szükséges.')
    .required('Alkotó azonosítók szükségesek.'),
  description: Yup.string().required('Leírás szükséges.'),
  posterURL: Yup.mixed()
    .test('fileFormat', 'Csak kép fájl engedélyezett.', (value) =>
      value ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type) : true,
    )
    .notRequired(),
  imagesURL: Yup.array()
    .of(
      Yup.mixed().test('fileFormat', 'Csak kép fájlok engedélyezettek.', (value) =>
        value ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type) : true,
      ),
    )
    .notRequired(),
  performanceDate: Yup.array()
    .of(Yup.date().min(new Date(), 'A dátum nem lehet a múltban.').notRequired())
    .notRequired(),
  price: Yup.number()
    .positive('Az ár csak pozitív szám lehet.')
    .integer('Az ár egész szám kell legyen.')
    .notRequired(),
});
