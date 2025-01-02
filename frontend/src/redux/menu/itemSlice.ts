
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../api/api';
import axios from 'axios';

export interface Item {
  item_id: string;
  title: string;
  description: string;
  price: string;
  template_sections:{
    header: string;
    section_id: string;
    template_id: string;
    templates:{
      id: string;
      user_id: number;
    }
  }
}
 
export interface Section {
  sectionName: string;
  items: Item[];
}

export interface Template {
  templateName: string;
  sections: Section[];
}
export interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

// Fetch items from backend
export const fetchItems = createAsyncThunk('items/fetchItems', async ({
  page,
  searchTerm,
  sortOption,
  sortOrder,
  limit,
}: {
  page: number;
  searchTerm: string;
  sortOption: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
}) => {
  const response = await axios.get(`${API_URL}/menu/menu-items`, {
    params: {
      page,
      search: searchTerm,
      sortField: sortOption,
      sortOrder,
      limit,
    },
  });
  console.log(response.data)
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
  const response = await axios.put(`${API_URL}/menu/menu-items/${item.item_id}`, item);
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
    totalPages: 1,
    currentPage: 1,
    totalItems: 0,
  } as ItemsState,
  reducers: {
    // addItem: (state, action: PayloadAction<Item>) => {
    //   state.items.push(action.payload);
    // },
    // updateItem: (state, action: PayloadAction<Item>) => {
    //   const index = state.items.findIndex(item => item.itemId === action.payload.itemId);
    //   if (index !== -1) state.items[index] = action.payload;
    // },
    // deleteItem: (state, action: PayloadAction<number>) => {
    //   state.items = state.items.filter(item => item.itemId !== action.payload);
    // },
  },
  extraReducers: builder => {
    builder
    .addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.data;
      state.totalItems = action.payload.totalItems;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;

    })
    .addCase(createItem.fulfilled, (state, action) => {
      console.log(action.payload)
      state.items.push(action.payload);
    })
    // .addCase(editItem.fulfilled, (state, action) => {
    //   const index = state.items.findIndex(item => item.itemId === action.payload.id);
    //   if (index !== -1) state.items[index] = action.payload;
    // })
    // .addCase(removeItem.fulfilled, (state, action) => {
    //   state.items = state.items.filter(item => item.itemId !== action.payload);
    // });
  }
});

// export const { addItem, updateItem } = itemsSlice.actions;
export default itemsSlice.reducer;
