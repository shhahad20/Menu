
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_URL } from '../../api/api';
import axios from 'axios';

export interface Item {
  id: number;
  name: string;
  description: string;
  calories: number;
  // protein: number;
  // carbs: number;
  // fat: number;
  price: number;
  image_url: string;
  category:{
    name: string;
  };
  isPopular?: boolean;
  isNew?: boolean;
}

export interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

// Fetch items from backend
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get(`${API_URL}/menu/menu-items`);
  return response.data;
});

export const createItem = createAsyncThunk('items/createItem', async (item: FormData, { rejectWithValue }) => {
  // const response = await axios.post(`${API_URL}/menu/menu-items`, item);
  // console.log(response)
  // return response.data;
    try {
      const response = await axios.post(`${API_URL}/menu/menu-items`, item)
      console.log('Hi slice :' + response)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
});

export const editItem = createAsyncThunk('items/editItem', async (item: Item) => {
  const response = await axios.put(`${API_URL}/menu/menu-items/${item.id}`, item);
  return response.data;
});
export const removeItem = createAsyncThunk('items/removeItem', async (id: number) => {
  await axios.delete(`${API_URL}/menu/menu-items/${id}`);
  return id;
});


const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
  } as ItemsState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
    .addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload; // Ensure this is the correct data
    })
    .addCase(createItem.fulfilled, (state, action) => {
      console.log(action.payload)
      state.items.push(action.payload);
    })
    .addCase(editItem.fulfilled, (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    })
    .addCase(removeItem.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });
  }
});

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
