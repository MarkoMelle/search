import { createSlice } from "@reduxjs/toolkit";

export const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    items: [],
    loading: false,
    error: null,
    search: "",
  },
  reducers: {
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    fetchSkills: (state) => {
      state.loading = true;
    },
    searchSkillsSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchSkillsFailure: (state, action) => {
      state.items = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  changeSearch,
  fetchSkills,
  searchSkillsSuccess,
  searchSkillsFailure,
} = skillsSlice.actions;

export default skillsSlice.reducer;
