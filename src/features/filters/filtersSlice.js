import { createSlice } from "@reduxjs/toolkit";

export const statusFilters = {
  All: "all",
  Active: "active",
  Completed: "completed"
};

const initialState = {
  status: statusFilters.All,
  colors: []
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload;
    },
    colorFilterChanged: {
      reducer(state, action) {
        const { color, changeType } = action.payload;
        switch (changeType) {
          case "added":
            if (!state.colors.includes(color)) {
              state.colors.push(color);
            }
            break;
          case "removed":
            state.colors = state.colors.filter(
              (addedColor) => addedColor !== color
            );
          default:
            return;
        }
      },
      prepare(color, changeType) {
        return {
          payload: { color, changeType }
        };
      }
    }
  }
});

export default filtersSlice.reducer;

export const { statusFilterChanged, colorFilterChanged } = filtersSlice.actions;
