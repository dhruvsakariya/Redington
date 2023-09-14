import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/index';
import { reHydrate } from './todoThunk';
import moment from 'moment';

export interface Task {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    dueDate: string;
    displayDescription: boolean;
}

export interface TodoState {
    list: Task[];

    form: Omit<Task, 'isCompleted' | 'displayDescription'> & {
        show: boolean;
    };
}

export const initialState: TodoState = {
    list: [
        {
            id: '1',
            title: 'Visit an art gallery',
            description:
                'Immerse yourself in a world of creativity and inspiration. Explore the vibrant colors and thought-provoking pieces at your local art gallery.',
            isCompleted: false,
            dueDate: '2023-09-18T20:41:41+05:30',
            displayDescription: false,
        },
        {
            id: '2',
            title: 'Finish reading that new book',
            description:
                "A gripping tale of mystery and adventure, the book has captivated your attention. You can't wait to unravel the secrets that lie within its pages.",
            isCompleted: false,
            dueDate: '2023-09-18T20:41:41+05:30',
            displayDescription: false,
        },

        {
            id: '3',
            title: 'Explore a new hiking trail',
            description:
                "Nature calls, and you're ready to answer. A pristine hiking trail awaits, promising breathtaking vistas and the soothing sounds of the wilderness.",
            isCompleted: false,
            dueDate: '2023-09-18T20:41:41+05:30',
            displayDescription: false,
        },

        {
            id: '4',
            title: 'Try a new cooking recipe',
            description:
                "The kitchen is your canvas, and today you're feeling adventurous. Time to experiment with flavors and create a culinary masterpiece.",
            isCompleted: false,
            dueDate: '2023-09-18T20:41:41+05:30',
            displayDescription: false,
        },

        {
            id: '5',
            title: 'Plan a weekend getaway',
            description:
                'Escape the daily grind and recharge. A cozy cabin in the woods or a beachfront retreat? The possibilities for a memorable weekend are endless.',
            isCompleted: false,
            dueDate: '2023-09-18T20:41:41+05:30',
            displayDescription: false,
        },
    ],
    form: {
        id: '-1',
        title: '',
        description: '',
        dueDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
        show: false,
    },
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {

        setList: (state, action: PayloadAction<Task[]>) => {
            state.list = action.payload;
        },

        addTask: (
            state,
            action: PayloadAction<
                Omit<Task, 'isCompleted' | 'id' | 'displayDescription'>
            >
        ) => {
            const list = state.list;

            list.push({
                ...action.payload,
                isCompleted: false,
                id: Date.now().toString(),
                displayDescription: false,
            });

        },

        updateTask: (state, action: PayloadAction<Task>) => {
            const task = action.payload;
            const list = state.list;
            const taskIdx = list.findIndex((item) => item.id === task.id);

            list[taskIdx] = { ...task };

            state.list = [...list];
        },

        completeTask: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const list = state.list;

            const taskIdx = list.findIndex((item) => item.id === id);

            list[taskIdx].isCompleted = !list[taskIdx].isCompleted;
        },

        deleteTask: (state, action: PayloadAction<string>) => {
            const id = action.payload;

            const list = state.list.filter((item, idx) => item.id !== id);

            state.list = [...list];
        },

        showTaskDescription: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const list = state.list;

            const taskIdx = list.findIndex((item) => item.id === id);

            list[taskIdx].displayDescription = !list[taskIdx].displayDescription;

            state.list = [...list];
        },

        displayAddTaskForm: (state, action: PayloadAction<boolean>) => {
            const show = action.payload;
            state.form.show = show;
        },

        setNewTitle: (state, action: PayloadAction<string>) => {
            state.form.title = action.payload;
        },

        setNewId: (state, action: PayloadAction<string>) => {
            state.form.id = action.payload;
        },

        setNewDescription: (state, action: PayloadAction<string>) => {
            state.form.description = action.payload;
        },

        setNewDueDate: (state, action: PayloadAction<string>) => {
            state.form.dueDate = action.payload;
        },

        clearForm: (state) => {
            state.form = { ...initialState.form };
        }
    },

    extraReducers: (builder) => {
        reHydrate(builder);
    },
});

export const {
    setList,
    addTask,
    updateTask,
    showTaskDescription,
    completeTask,
    deleteTask,
    displayAddTaskForm,
    setNewId,
    setNewTitle,
    setNewDescription,
    setNewDueDate,
    clearForm,
} = todoSlice.actions;

export const todoState = (state: RootState) => state.todo;

export default todoSlice.reducer;
