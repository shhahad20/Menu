import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../../api/api"; // Import the API functions
import axios from "axios";

export interface TemplateItem {
  id: string;
  price: string;
  title: string;
  item_id: string;
  description: string;
}

export interface TemplateSection {
  header: string;
  section_id: string;
  section_order: number;
  template_items: TemplateItem[];
}

export interface MenuTemplate {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  original_id: string;
  template_sections: TemplateSection[];
}

interface MenuState {
  templates: MenuTemplate[]; // List of templates
  currentTemplate: MenuTemplate | null; // Currently selected template
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  userTemplates: MenuTemplate[];
}

const initialState: MenuState = {
  templates: [],
  userTemplates: [],
  currentTemplate: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

// Fetch data from backend using Axios
export const fetchAllMenuTemplates = createAsyncThunk(
  "menu/fetchAllMenusData",
  async () => {
    const response = await axios.get(`${API_URL}/menus`);
    return response.data.payload;
  }
);
export const fetchMenuTemplateById = createAsyncThunk(
  "menu/fetchMenuDataById",
  async (menuId: string) => {
    const response = await axios.get(`${API_URL}/menus/${menuId}`);
    return response.data.payload;
  }
);

export const fetchMenuTemplatesForUser = createAsyncThunk(
  "menu/fetchMenuTemplatesForUser",
  async ({
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
    try {
      const response = await axios.get(`${API_URL}/menus/my-menus`, {
        params: {
          page,
          search: searchTerm,
          sortField: sortOption,
          sortOrder,
          limit,
        },
      });
      return response.data.payload;
    } catch (error) {
      console.error("Error Fetching user templates:", error);
      throw error;
    }
  }
); 

// Copy a menu template
export const copyMenuTemplate = createAsyncThunk(
  "menu/copyMenuTemplate",
  async (templateId: string) => {
    try {
      const response = await axios.post(`${API_URL}/menus/copy-template`, {
        templateId,
      });
      const newTemplate = await axios.get(
        `${API_URL}/menus/${response.data.payload.id}`
      );
      return newTemplate.data.payload;
    } catch (error) {
      console.error("Error copying template:", error);
      throw error;
    }
  }
);

// Update a menu template (e.g., section or item)
export const updateMenuTemplate = createAsyncThunk(
  "menu/updateMenuTemplate",
  async (template: MenuTemplate) => {
    const response = await axios.put(
      `${API_URL}/menus/${template.id}`,
      template
    );
    return response.data.payload; // Adjusted for your API response
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
    clearCurrentTemplate(state) {
      state.currentTemplate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMenuTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllMenuTemplates.fulfilled,
        (state, action: PayloadAction<MenuTemplate[]>) => {
          state.loading = false;
          state.templates = action.payload;
        }
      )
      .addCase(fetchAllMenuTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch menu templates";
      })
      .addCase(fetchMenuTemplateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuTemplatesForUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuTemplatesForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload.templates;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMenuTemplatesForUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        fetchMenuTemplateById.fulfilled,
        (state, action: PayloadAction<MenuTemplate>) => {
          state.loading = false;
          state.currentTemplate = action.payload;
        }
      )
      .addCase(fetchMenuTemplateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch menu template";
      })
      .addCase(
        copyMenuTemplate.fulfilled,
        (state, action: PayloadAction<MenuTemplate>) => {
          state.userTemplates.push(action.payload);
          state.currentTemplate = action.payload; // Set the copied template as the current template
          state.loading = false;
        }
      )
      .addCase(
        updateMenuTemplate.fulfilled,
        (state, action: PayloadAction<MenuTemplate>) => {
          const index = state.templates.findIndex(
            (template) => template.id === action.payload.id
          );
          if (index !== -1) {
            state.templates[index] = action.payload;
          }
          if (state.currentTemplate?.id === action.payload.id) {
            state.currentTemplate = action.payload;
          }
        }
      );
  },
});
export const { clearCurrentTemplate } = menuSlice.actions;
export default menuSlice.reducer;
