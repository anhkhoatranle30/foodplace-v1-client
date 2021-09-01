import * as yup from "yup";

const categorySchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

export default categorySchema;
