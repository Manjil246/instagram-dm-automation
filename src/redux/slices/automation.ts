import { duplicationValidation } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateTriggerProps = {
  trigger?: {
    type?: "COMMENT" | "DM";
    keyword?: string;
    types?: string[];
    keywords?: string[];
  };
};

const initialState: InitialStateTriggerProps = {
  trigger: {
    type: undefined,
    keyword: undefined,
    types: [],
    keywords: [],
  },
};

export const automation = createSlice({
  name: "automation",
  initialState,
  reducers: {
    TRIGGER: (state, action: PayloadAction<InitialStateTriggerProps>) => {
      state.trigger!.types = duplicationValidation(
        state.trigger?.types!,
        action.payload.trigger?.type!
      );
      return state;
    },
  },
});

export const { TRIGGER } = automation.actions;
export default automation.reducer;
