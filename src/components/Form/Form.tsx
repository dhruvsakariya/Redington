import React from 'react'

import { Label, TextInput, Textarea, Datepicker } from 'flowbite-react';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { displayAddTaskForm, todoState } from '../../store/todo/todoSlice';

const Form = () => {

  const { show } = useAppSelector(todoState).form;
  const dispatch = useAppDispatch();

  return (
    <Modal
      ariaHideApp={false}
      isOpen={show}
      className={'modal_1'}
      onRequestClose={() => {
        dispatch(displayAddTaskForm(false))
      }}
      shouldCloseOnOverlayClick
      overlayClassName="overlay_1"
    >
      <div className={'bg-white rounded-md   w-full lg:w-[400px] '}>
        <div className='flex items-center mb-3 ps-4 pe-1 py-2  ' >
          <h2 className='text-xl text-primary font-semibold ' >New Task</h2>
          <GrClose
            className="block  ml-auto bg-whiteFade rounded-full cursor-pointer p-2 "
            size={36}
            onClick={() => {
              dispatch(displayAddTaskForm(false))
            }}
          />
        </div>

        <div className='px-3 py-4 ' >
          <div className="mb-2 block">
            <Label
              htmlFor="duedate"
              value="Due date"
            />
          </div>
          <Datepicker id='duedate' className='mb-3'
            minDate={new Date()} />
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="title"
                  value="Title"
                />
              </div>
              <TextInput
                id="title"
                placeholder="You wanted to ..."
                required
                type="text"
              />
            </div>
            <div
              className="max-w-md"
              id="textarea"
            >
              <div className="mb-2 block">
                <Label
                  htmlFor="comment"
                  value="Description"
                />
              </div>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={4}
              />
            </div>

            <button type="submit" className='group flex h-min items-center justify-center p-2 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2' >
              Submit
            </button>
          </form>
        </div>

      </div>
    </Modal>

  )
}

export default Form