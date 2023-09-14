import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/index';
import { reHydrate } from './todoThunk';

interface Task {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    dueDate: string;
    displayDescription: boolean;
}

export interface TodoState {
    list: Task[];

    form: Omit<Task, 'isCompleted' | 'id' | 'displayDescription'> & { show: boolean };
}

export const initialState: TodoState = {
    list: [
        {
            id: 1,
            title: "Visit an art gallery",
            description:
                'Immerse yourself in a world of creativity and inspiration. Explore the vibrant colors and thought-provoking pieces at your local art gallery.',
            isCompleted: false,
            dueDate: '2023-09-14T20:41:41+05:30',
            displayDescription: false,
        },
        {
            id: 2,
            title: 'Finish reading that new book',
            description:
                "A gripping tale of mystery and adventure, the book has captivated your attention. You can't wait to unravel the secrets that lie within its pages.",
            isCompleted: false,
            dueDate: '2023-09-14T20:41:41+05:30',
            displayDescription: false,
        },

        {
            id: 3,
            title: 'Explore a new hiking trail',
            description:
                "Nature calls, and you're ready to answer. A pristine hiking trail awaits, promising breathtaking vistas and the soothing sounds of the wilderness.",
            isCompleted: false,
            dueDate: '2023-09-14T20:41:41+05:30',
            displayDescription: false,
        },

        {
            id: 4,
            title: 'Try a new cooking recipe',
            description:
                "The kitchen is your canvas, and today you're feeling adventurous. Time to experiment with flavors and create a culinary masterpiece.",
            isCompleted: false,
            dueDate: '2023-09-14T20:41:41+05:30',
            displayDescription: false,
        },

        {
            id: 5,
            title: 'Plan a weekend getaway',
            description:
                'Escape the daily grind and recharge. A cozy cabin in the woods or a beachfront retreat? The possibilities for a memorable weekend are endless.',
            isCompleted: false,
            dueDate: '2023-09-14T20:41:41+05:30',
            displayDescription: false,
        },

        {
            id: 6,
            title: 'Start a daily meditation practice',
            description:
                'Amid the chaos of life, find inner calm. Beginning a daily meditation routine promises mental clarity and a sense of tranquility.',
            isCompleted: false,
            dueDate: '2023-09-14T20:41:41+05:30',
            displayDescription: false,
        },

        {
            id: 7,
            title: 'Learn a new language',
            description:
                'Expand your horizons and embrace a new culture. Learning a language is a journey that opens doors to new experiences and connections.',
            isCompleted: false,
            dueDate: '2023-09-14T20:41:41+05:30',
            displayDescription: false,
        },

        {
            id: 8,
            title: 'Organize a charity event',
            description:
                'Give back to the community and make a positive impact. Organizing a charity event can bring people together for a meaningful cause.',
            isCompleted: false,
            dueDate: '2023-09-14T20:41:41+05:30',
            displayDescription: false,
        },

        {
            id: 9,
            title: 'Renew gym membership',
            description:
                'Time to get back into shape! Renewing your gym membership is the first step toward a healthier, more active lifestyle.',
            isCompleted: false,
            dueDate: '2023-09-14T20:41:41+05:30',
            displayDescription: false,
        },

        {
            id: 10,
            title: 'Write a heartfelt letter to a loved one',
            description:
                'Words have the power to heal and strengthen bonds. Take a moment to pen a letter expressing your love and appreciation to someone dear.',
            isCompleted: false,
            dueDate: '2023-09-14T20:41:41+05:30',
            displayDescription: false,
        },
    ],
    form: {
        title: '',
        description: '',
        dueDate: '',
        show: false,
    },
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTask: (
            state,
            action: PayloadAction<Omit<Task, 'isCompleted' | 'id'>>
        ) => {
            const list = state.list;

            list.push({ ...action.payload, isCompleted: false, id: list.length });
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

            list[taskIdx].isCompleted = !list[taskIdx].isCompleted;
        },

        deleteTask: (state, action: PayloadAction<number>) => {
            const id = action.payload;

            const list = state.list.filter((item, idx) => item.id !== id);

            state.list = [...list];
        },


        showTaskDescription: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const list = state.list;

            const taskIdx = list.findIndex((item) => item.id === id);

            list[taskIdx].displayDescription = !list[taskIdx].displayDescription;

            state.list = [...list];
        },

        displayAddTaskForm: (state, action: PayloadAction<boolean>) => {
            const show = action.payload;
            state.form.show = show
        }

    },

    extraReducers: (builder) => {
        reHydrate(builder);
    },
});

export const { addTask, showTaskDescription, completeTask, deleteTask, displayAddTaskForm } = todoSlice.actions;

export const todoState = (state: RootState) => state.todo;

export default todoSlice.reducer;
