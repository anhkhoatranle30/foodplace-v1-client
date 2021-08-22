import * as yup from "yup";

const placeSchema = yup.object().shape({
  name: yup.string().min(1).max(30).required(),
  description: yup.string().max(1000),
  rating: yup.number().min(0).max(10),
  address: yup.string().required(),
  openingHours: yup.object().shape({
    start: yup.object().shape({
      hour: yup.number().min(0).max(23),
      minute: yup.number().min(0).max(59),
    }),
    end: yup.object().shape({
      hour: yup.number().min(0).max(23),
      minute: yup.number().min(0).max(59),
    }),
  }),
  isYourFavorite: yup.boolean(),
  categoryId: yup.string().required("category is a required field"),
});

export default placeSchema;
