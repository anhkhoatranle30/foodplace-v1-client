import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import userReducer from './slices/userSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		category: categoryReducer,
	},
});
