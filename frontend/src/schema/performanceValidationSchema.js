import * as Yup from 'yup';

const performanceValidationSchema = Yup.object({
  title: Yup.string()
    .required('Előadás neve szükséges.')
    .min(3, 'Az előadás neve legalább 3 karakter hosszú kell legyen.'),
  description: Yup.string().required('Leírás szükséges.'),
  image: Yup.mixed()
    .required('Kép szükséges.')
    .test('fileSize', 'A fájl túl nagy', (value) => value && value.size <= 1048576), // max 1MB
});
export default performanceValidationSchema;