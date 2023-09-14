import {
  Label,
  TextInput,
  Textarea,
  Datepicker,
  Tooltip,
  DatepickerProps,
} from 'flowbite-react';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addTask,
  clearForm,
  displayAddTaskForm,
  setNewDescription,
  setNewDueDate,
  setNewTitle,
  todoState,
  updateTask,
} from '../../store/todo/todoSlice';
import { BsExclamation } from 'react-icons/bs';
import moment from 'moment';

const Form = () => {
  const { id, show, title, description, dueDate } = useAppSelector(todoState).form;
  const dispatch = useAppDispatch();

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNewTitle(e.target.value));
  };

  const handleDescriptionInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setNewDescription(e.target.value));
  };

  const handleDueDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNewDueDate(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    if (id === '-1') {
      dispatch(addTask({ title, description, dueDate }));
    } else {
      dispatch(updateTask({ id, title, description, dueDate, displayDescription: false, isCompleted: false }))
    }

    dispatch(displayAddTaskForm(false));

    dispatch(clearForm());

  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={show}
      className={'modal_1'}
      onRequestClose={() => {
        dispatch(displayAddTaskForm(false));
        dispatch(clearForm());
      }}
      shouldCloseOnOverlayClick
      overlayClassName="overlay_1"
    >
      <div className={'bg-white rounded-md   w-[315px] sm:w-[350px] md:w-[370px] lg:w-[400px] '}>
        <div className="flex items-center mb-3 ps-4 pe-1 py-2  ">
          <h2 className="text-xl text-primary font-semibold ">New Task</h2>
          <GrClose
            className="block  ml-auto bg-whiteFade rounded-full cursor-pointer p-2 "
            size={36}
            onClick={() => {
              dispatch(displayAddTaskForm(false));
              dispatch(clearForm());
            }}
          />
        </div>

        <div className="px-3 py-4 ">
          <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit} >
            <div>
              <div className="mb-2 mt-2 flex items-center">
                <Label htmlFor="title" value="Title" />
                <Tooltip content="Engaging titles captivate, inform, and inspire readers effectively and efficiently.">
                  <BsExclamation
                    size={18}
                    className="bg-slate-100 mx-2 rounded-full"
                  />
                </Tooltip>
              </div>
              <TextInput
                id="title"
                placeholder="You wanted to ..."
                required
                type="text"
                value={title}
                onChange={handleTitleInput}
              />
            </div>
            <div className="max-w-md" id="textarea">
              <div className="mb-2 mt-2 flex items-center ">
                <Label htmlFor="comment" value="Description" />
                <Tooltip content="Adding descriptions to tasks enhances clarity, accountability, and collaboration.">
                  <BsExclamation
                    size={18}
                    className="bg-slate-100 mx-2 rounded-full"
                  />
                </Tooltip>
              </div>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={4}
                value={description}
                onChange={handleDescriptionInput}
              />
            </div>

            <div>
              <div className="mb-2 mt-2 flex items-center">
                <Label htmlFor="duedate" value="Due date" />
                <Tooltip content="Due date prioritizes tasks, ensures timeliness, and manages responsibilities efficiently.">
                  <BsExclamation
                    size={18}
                    className="bg-slate-100 mx-2 rounded-full"
                  />
                </Tooltip>
              </div>
              <TextInput
                type="datetime-local"
                required
                id="duedate"
                className="mb-3"
                min={moment(new Date()).format('YYYY-MM-DDTHH:mm')}
                defaultValue={moment(dueDate).format('YYYY-MM-DDTHH:mm')}
                onChange={handleDueDateInput}
              />
            </div>

            <button
              type="submit"
              className="group flex h-min items-center justify-center p-2 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Form;
