import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryApi from '../../apis/categoryApi';

const initialState = {
	status: 'idle',
	data: [],
	error: null,
};

export const fetchAllCategoriesAction = createAsyncThunk(
	'categories/fetch',
	async (token, thunkApi) => {
		try {
			const response = await categoryApi.fetchAll(token);
			return response.data;
		} catch (err) {
			if (!err.response) {
				throw err;
			}
			return thunkApi.rejectWithValue(err.response.data);
		}
	}
);

export const postCategoryAction = createAsyncThunk(
	'categories/post',
	async ({ token, body }, thunkApi) => {
		try {
			const response = await categoryApi.postCategory(token, body);
			return response.data;
		} catch (err) {
			if (!err.response) {
				throw err;
			}
			return thunkApi.rejectWithValue(err.response.data);
		}
	}
);

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchAllCategoriesAction.pending]: (state) => {
			state.status = 'loading';
			state.data = [];
			state.error = null;
		},
		[fetchAllCategoriesAction.fulfilled]: (state, action) => {
			state.status = 'success';
			state.data = action.payload;
			state.error = null;
		},
		[fetchAllCategoriesAction.rejected]: (state, action) => {
			state.status = 'error';
			state.data = [];
			state.error = action.payload;
		},
		[postCategoryAction.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		[postCategoryAction.fulfilled]: (state, action) => {
			state.status = 'success';
			const newState = [...state.data, action.payload];
			state.data = newState;
			state.error = null;
		},
		[postCategoryAction.rejected]: (state, action) => {
			state.status = 'error';
			state.error = action.payload;
		},
	},
});

export default categorySlice.reducer;
