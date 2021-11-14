import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProjectStates = {
  tags: string[];
  sortByTitle: string;
  sortByTime: string;
};

type ProjectStatesPayload = {
  title: string;
};

const initialState: ProjectStates = {
  tags: [],
  sortByTitle: "asc",
  sortByTime: "asc",
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
    changeOrder: (
      state,
      action: PayloadAction<{ sortAlphabet?: string; sortTime?: string }>
    ) => {
      state.sortByTitle = action.payload.sortAlphabet || state.sortByTitle;
      state.sortByTime = action.payload.sortTime || state.sortByTime;
    },
  },
});

export const { addTag, removeTag, changeOrder } = projectSlices.actions;

export default projectSlices.reducer;
