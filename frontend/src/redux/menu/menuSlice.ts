import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories, getMenuItems } from '../../api/api'; // Import the API functions

export interface MenuItem {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
  image: string;
  category:{
    name: string;
  };
  isPopular?: boolean;
  isOnlineOnly?: boolean;
}

interface MenuState {
  categories: string[];
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  categories: ['All'],
  menuItems: [],
  loading: false,
  error: null,
};

// Fetch data from backend using Axios
export const fetchMenuData = createAsyncThunk(
  'menu/fetchMenuData',
  async () => {
    const categories = await getCategories(); // Use Axios to get categories
    const menuItems = await getMenuItems();   // Use Axios to get menu items

    return {
      categories: categories.map((category: { name: string }) => category.name),
      menuItems,
    };
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = ['All', ...(action.payload.categories || [])];
        state.menuItems = action.payload.menuItems || [];
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default menuSlice.reducer;
