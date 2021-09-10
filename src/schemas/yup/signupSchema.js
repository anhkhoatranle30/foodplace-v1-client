import * as yup from 'yup';

const signupSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(6).max(30).required(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default signupSchema;
