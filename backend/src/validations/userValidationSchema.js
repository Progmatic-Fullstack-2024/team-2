import * as yup from "yup";

const userValidationSchemaForLogin = yup.object({
  email: yup
    .string()
    .email("Valid email address is required!")
    .required("Email is mandatory!"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters!")
    .required("Password is mandatory!"),
});

export default userValidationSchemaForLogin;
