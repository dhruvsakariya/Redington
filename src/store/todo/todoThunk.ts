import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { TodoState } from "./todoSlice";
import { REHYDRATE, RehydrateAction } from 'redux-persist';
import { RootState } from "../../app/index";

export const reHydrate = (
    builder: ActionReducerMapBuilder<TodoState>
): void => {
    builder.addCase(REHYDRATE, (state, action: RehydrateAction) => {
        const root = action.payload as RootState;

        if (root && root.todo) state = root.todo;

        for (let i = 0; i < state.list.length; i++)
            state.list[i].displayDescription = false;

        return {
            ...state,
            form: { ...state.form, show: false }
        };
    });
};
