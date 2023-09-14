
import { store } from '../../app/index';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Task from './Task';
import moment from 'moment';
import { AnyAction, Store } from '@reduxjs/toolkit';

afterEach(cleanup);
const mockStore = configureStore([]);

test('renders Task component with initial state', () => {
    render(
        <Provider store={store}>
            <Task />
        </Provider>
    );

    expect(screen.getByText('Productivity Powerhouse')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
});


describe('Task component', () => {
    let store: Store<unknown, AnyAction>;

    beforeEach(() => {

        store = mockStore({
            todo: {
                list: [
                    {
                        id: '1',
                        title: 'Test task 1',
                        description: 'Description 1',
                        displayDescription: false,
                        isCompleted: false,
                        dueDate: moment().add(1, 'days').toISOString(),
                    },
                    {
                        id: '2',
                        title: 'Test task 2',
                        description: 'Description 2',
                        displayDescription: false,
                        isCompleted: false,
                        dueDate: moment().add(2, 'days').toISOString(),
                    },
                ],
            },
        });

        store.dispatch = jest.fn();
    });

    it('renders tasks properly', () => {
        render(
            <Provider store={store}>
                <Task />
            </Provider>
        );

        expect(screen.getByText('Test task 1')).toBeInTheDocument();
        expect(screen.getByText('Test task 2')).toBeInTheDocument();
    });

    it('shows task description when clicked', async () => {
        render(
            <Provider store={store}>
                <Task />
            </Provider>
        );

        const taskArrowButton = screen.getAllByRole('button', {
            name: /task description toggle/i,
        })[0];
        fireEvent.click(taskArrowButton);

        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'todo/showTaskDescription',
            payload: '1',
        });
    });

    it('completes task when checkbox is clicked', () => {
        render(
            <Provider store={store}>
                <Task />
            </Provider>
        );

        const checkBox = screen.getByLabelText('task status 1');
        fireEvent.click(checkBox);

        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'todo/completeTask',
            payload: '1',
        });
    });

    it('edits task when edit icon is clicked', () => {
        render(
            <Provider store={store}>
                <Task />
            </Provider>
        );

        const editIcon = screen.getAllByRole('button', { name: /edit task/i })[0];
        fireEvent.click(editIcon);

        expect(store.dispatch).toHaveBeenCalledTimes(5);
    });

    it('deletes task when delete icon is clicked', async () => {
        render(
            <Provider store={store}>
                <Task />
            </Provider>
        );

        const deleteIcon = screen.getAllByRole('button', { name: /delete task/i })[0];
        fireEvent.click(deleteIcon);


        await screen.findByRole('button', { name: /delete/i });

        fireEvent.click(screen.getByRole('button', { name: /delete/i }));

        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'todo/deleteTask',
            payload: '1',
        });
    });

    it('filters tasks based on search query', async () => {
        render(
            <Provider store={store}>
                <Task />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText(/search tasks.../i);
        fireEvent.change(searchInput, { target: { value: 'Test task 2' } });

        expect(screen.queryByText('Test task 1')).toBeNull();
        expect(screen.getByText('Test task 2')).toBeInTheDocument();
    });
});

