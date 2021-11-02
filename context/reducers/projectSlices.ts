import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProjectStates = {
  tags: string[];
};

type ProjectStatesPayload = {
  title: string;
};

const initialState: ProjectStates = {
  tags: [],
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
  },
});

export const { addTag, removeTag } = projectSlices.actions;

export default projectSlices.reducer;
