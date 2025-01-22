import * as yup from "yup";

const performanceValidationSchemaForCreate = yup.object({
  title: yup.string().required("Title is mandatory!"),
  theaterId: yup.string().required("TheaterId is mandatory!"),
  description: yup.string().required("Description is mandatory!"),
  price: yup
    .number()
    .positive("Price must be a positive number!")
    .required("Price is mandatory!"),
  performanceDate: yup
    .array()
    .of(
      yup
        .date()
        .typeError("Please provide a valid date!")
        .min(new Date(), "The date must be in the future!"),
    ),
  creatorsIds: yup
    .array()
    .of(yup.string())
    .required("Creator must be specified!"),
});

const performanceValidationSchemaForUpdate = yup.object({
  price: yup.number().positive("Price must be a positive number!"),
  performanceDate: yup
    .array()
    .of(
      yup
        .date()
        .typeError("Please provide a valid date!")
        .min(new Date(), "The date must be in the future!"),
    ),
});

export {
  performanceValidationSchemaForCreate,
  performanceValidationSchemaForUpdate,
};
