import * as Yup from 'yup';

const performanceValidationSchema = Yup.object({
  title: Yup.string()
    .required('Előadás neve szükséges.')
    .min(3, 'Az előadás neve legalább 3 karakter hosszú kell legyen.'),
  description: Yup.string().required('Leírás szükséges.'),
  image: Yup.mixed()
    .required('Kép szükséges.')
    .test(
      'fileSize',
      'A fájl túl nagy (max. 1MB)',
      (value) => (value ? value.size <= 1048576 : false), 
    )
    .test(
      'fileType',
      'Csak képek tölthetők fel (jpg, png, jpeg)',
      (value) => (value ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type) : false), 
    ),
});
export default performanceValidationSchema;
