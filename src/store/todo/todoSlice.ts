import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/index';

interface Task {

    id: number,
    title: string,
    description: string,
    isCompleted: boolean,

}

export interface TodoState {

    list: Task[],

    form: Omit<Task, 'isCompleted' | 'id'>

}

export const initialState: TodoState = {


    list: [],
    form: {
        title: '',
        description: ''
    }


};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {

        addTask: (state, action: PayloadAction<Omit<Task, 'isCompleted'>>) => {
            const list = state.list;

            list.push({ ...action.payload, isCompleted: false });
        },

        updateTask: (state, action: PayloadAction<Task>) => {
            const task = action.payload;
            const list = state.list;
            const taskIdx = list.findIndex((item) => item.id === task.id);

            list[taskIdx] = { ...task };

            state.list = [...list];
        },

        completeTask: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const list = state.list;

            const taskIdx = list.findIndex((item) => item.id === id);

            list[taskIdx].isCompleted = !list[taskIdx].isCompleted

        },

        deleteTask: (state, action: PayloadAction<number>) => {
            const id = action.payload;

            const list = state.list.filter((item, idx) => item.id !== id);

            state.list = [...list];
        }

    },

    extraReducers: (builder) => { },
});

export const { addTask } = todoSlice.actions;

export const todoState = (state: RootState) => state.todo;

export default todoSlice.reducer;
