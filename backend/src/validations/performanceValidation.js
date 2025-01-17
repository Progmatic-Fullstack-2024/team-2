import * as yup from "yup";

const performanceValidationSchemaForCreate = yup.object({
  title: yup.string().required("Title is mandatory!"),
  theaterId: yup.string().required("TheaterId is mandatory!"),
  description: yup.string().required("Description is mandatory!"),
  price: yup.number().required("Price is mandatory!"),
  performanceDate: yup.date().typeError("Please provide a valid date!"),
  creatorsId: yup
    .array()
    .of(yup.string().required("Creator must be specified!")),
});

export default performanceValidationSchemaForCreate;
