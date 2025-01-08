import * as yup from "yup";

const userValidationSchemaForLogin = yup.object({
  email: yup
    .string()
    .email("Valós emailt adj meg!")
    .required("Email megadása kötelező!"),
  password: yup
    .string()
    .min(6, "A jelszónak minimum 6 karakternek kell lennie")
    .required("A jelszó megadása kötelező!"),
});

export default userValidationSchemaForLogin;
