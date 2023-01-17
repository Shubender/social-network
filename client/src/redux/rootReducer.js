import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    bioText: "",
};

const rootReducer = createReducer(initialState, (builder) => {
    builder.addCase("bioUpdated", (state, action) => {
        state.bioText = action.payload;
    });
});

export default rootReducer;
