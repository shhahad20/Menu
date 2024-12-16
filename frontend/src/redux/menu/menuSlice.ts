import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_URL, getCategories, getMenuItems } from '../../api/api'; // Import the API functions
import axios from 'axios';

export interface MenuItem {
  id: number;
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
  isNew?: boolean;
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
export const updateMenuData = createAsyncThunk(
  'menu/updateMenuData',
  async (item: MenuItem) => {
    const response = await axios.put(`${API_URL}/menu/categories/${item.id}`, item);
    return response.data;
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
      })
      // Upadte 
      .addCase(updateMenuData.fulfilled, (state, action: PayloadAction<MenuItem>) => {
        const index = state.menuItems.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.menuItems[index] = action.payload;
        }
      });
  },
});

export default menuSlice.reducer;
