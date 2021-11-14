import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProjectStates = {
  tags: string[];
  sortByTitle: string;
};

type ProjectStatesPayload = {
  title: string;
};

const initialState: ProjectStates = {
  tags: [],
  sortByTitle: "asc",
};

export const projectSlices = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<ProjectStatesPayload>) => {
      const title = action.payload.title;
      state.tags = [...state.tags, title];
    },
    removeTag: (state, action: PayloadAction<ProjectStatesPayload>) => {
      const title = action.payload.title;
      state.tags.splice(state.tags.indexOf(title), 1);
    },
    changeOrder: (state, action: PayloadAction<{ sortAlphabet?: string }>) => {
      state.sortByTitle = action.payload.sortAlphabet || state.sortByTitle;
    },
  },
});

export const { addTag, removeTag, changeOrder } = projectSlices.actions;

export default projectSlices.reducer;
