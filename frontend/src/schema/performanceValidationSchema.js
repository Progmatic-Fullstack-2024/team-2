import * as Yup from 'yup';

export const performanceValidationSchema = Yup.object({
    title: Yup.string()
      .required('Előadás neve szükséges.')
      .min(3, 'Az előadás neve legalább 3 karakter hosszú kell legyen.'),
    theaterId: Yup.string().required('Színház azonosító szükséges.'),
    creatorId: Yup.array()
      .of(Yup.string())
      .test('no-undefined', 'Minden alkotó megadása kötelező.', (value) =>
        Array.isArray(value) ? !value.includes(undefined) : false
      )
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