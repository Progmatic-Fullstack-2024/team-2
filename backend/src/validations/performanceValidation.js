import * as yup from "yup";

const performanceValidationSchemaForCreate = yup.object({
  title: yup.string().required("Title is mandatory!"),
  theaterId: yup.string().required("TheaterId is mandatory!"),
  description: yup.string().required("Description is mandatory!"),
  creators: yup.array().of(yup.object()).required("Creator must be specified!"),
});

export default { performanceValidationSchemaForCreate };
