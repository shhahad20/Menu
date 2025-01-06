import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../api/api";
import axios from "axios";

export interface Section {
  section_id: string;
  header: string;
  section_order: string;
  template_id: string;
  templates: {
    id: string;
    user_id: number;
  };
}
export interface SectionState {
  sections: Section[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export const fetchSections = createAsyncThunk(
  "sections/fetch-sections",
  async (
    params: {
      page: number;
      searchTerm: string;
      sortOption: string;
      sortOrder?: "asc" | "desc";
      limit?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`${API_URL}/menu/menu-sections`, {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.msg || "Error fetching sections"
        );
      }
      throw error;
    }
  }
);

export const fetchSectionById = createAsyncThunk(
  "sections/fetch-sections",
  async (section_id: string) => {
    const response = await axios.get(
      `${API_URL}/menu/menu-sections/${section_id}`
    );
    return response.data;
  }
);

export const createSection = createAsyncThunk(
  "sections/createSection",
  async ({template_id, header}:{template_id:string, header:string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/menu/menu-sections`,
        {
            template_id, header
          }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg);
      }
    }
  }
);

export const updateSection = createAsyncThunk(
  "sections/editSection",
  async ({section_id,header}:{section_id:string,header:string}) => {
    const response = await axios.put(`${API_URL}/menu/menu-sections`, {section_id,header});
    return response.data;
  }
);

export const removeSection = createAsyncThunk(
  "sections/removeSection",
  async (id: string) => {
    await axios.delete(`${API_URL}/menu/menu-sections/${id}`);
    return id;
  }
);

const sectionSlice = createSlice({
  name: "sections",
  initialState: {
    sections: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    totalItems: 0,
  } as SectionState,
  reducers: {
    clearError(state) {
      state.error = null; // Can be useful for UI error handling
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch sections.";
      })
      .addCase(createSection.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create section.";
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        const index = state.sections.findIndex(
          (s) => s.section_id === action.payload.section_id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
      })
      .addCase(removeSection.fulfilled, (state, action) => {
        state.sections = state.sections.filter(
          (s) => s.section_id !== action.payload
        );
      });
  },
});
export const { clearError } = sectionSlice.actions;
export default sectionSlice.reducer;
