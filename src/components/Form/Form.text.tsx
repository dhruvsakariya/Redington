import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form'

describe('Form component', () => {
    it('renders correctly when show is true', () => {
        const { container } = render(<Form />);
        expect(container).toMatchSnapshot();
        expect(screen.getByText('New Task')).toBeInTheDocument();
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
        expect(screen.getByLabelText('Due date')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('closes the modal when close button is clicked', () => {
        const { container } = render(<Form />);
        const closeButton = screen.getByLabelText('Close');
        userEvent.click(closeButton);
        expect(container).toMatchSnapshot();
    });

    it('submits the form with valid data', () => {
        const { container } = render(<Form />);
        const titleInput = screen.getByLabelText('Title');
        const descriptionInput = screen.getByLabelText('Description');
        const dueDateInput = screen.getByLabelText('Due date');
        const submitButton = screen.getByText('Submit');

        userEvent.type(titleInput, 'Test Task');
        userEvent.type(descriptionInput, 'This is a test description.');
        userEvent.type(dueDateInput, '2023-12-31T12:00');
        userEvent.click(submitButton);

    });
});
