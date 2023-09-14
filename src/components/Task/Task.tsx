import type { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import React, { Dispatch, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    Task as TaskType,
    completeTask,
    deleteTask,
    displayAddTaskForm,
    setList,
    setNewDescription,
    setNewDueDate,
    setNewId,
    setNewTitle,
    showTaskDescription,
    todoState,
} from '../../store/todo/todoSlice';
import { BiSolidLeftArrow } from 'react-icons/bi';
import { IoMdSearch } from 'react-icons/io';
import { BiPlus } from 'react-icons/bi';
import { FiEdit3 } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { MdDragIndicator, MdOutlineDelete } from 'react-icons/md';
import { SlClose } from 'react-icons/sl';
import Modal from 'react-modal';

import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';

import styles from './Task.module.css';
import moment from 'moment';
const {
    tasks,
    title,
    taskTitle,
    taskContainer,
    titleContainer,
    showDescription,
    taskDescription,
    descriptionHolder,
    deleteIcon,
    editIcon,
} = styles;

const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const Task = () => {
    const [showAreYouSure, setShowAreYouSure] = useState<string>('-1');

    const { list } = useAppSelector(todoState);
    const dispatch = useAppDispatch();

    const handleShowDescription = (id: string) => {
        dispatch(showTaskDescription(id));
    };

    const handleCompleteTask = (id: string) => {
        dispatch(completeTask(id));
    };

    const handleDeleteTask = (id: string) => {
        dispatch(deleteTask(id));
    };

    const handleShowTaskForm = () => {
        dispatch(displayAddTaskForm(true));
    };

    const handleEditTask = (id: string) => {
        handleShowTaskForm();
        const editIdx = list.findIndex((item) => item.id === id);
        dispatch(setNewId(list[editIdx].id));
        dispatch(setNewTitle(list[editIdx].title));
        dispatch(setNewDescription(list[editIdx].description));
        dispatch(setNewDueDate(list[editIdx].dueDate));
    };

    const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items: TaskType[] = reorder(
            list,
            result.source.index,
            result.destination.index
        ) as TaskType[];

        dispatch(setList(items));
    };

    return (
        <main className=" w-full sm:w-[80%] md:w-[75%] lg:w-[60%]  mx-auto   px-[12px] sm:px-[24px] md:px-[32px] lg:px-[40px] py-2 mb-10  rounded-md mt-0 sm:mt-4 md:mt-8 lg:mt-10 shadow ">
            <div className="flex items-center  my-8">
                <h1 className={title}>Productivity Powerhouse</h1>

                <div
                    className="bg-primary p-2 mx-3 rounded-full cursor-pointer"
                    onClick={handleShowTaskForm}
                >
                    <BiPlus className="text-white" size={22} />
                </div>
            </div>

            <header className='mb-6 sm:flex sm:flex-row-reverse  sm:justify-between sm:items-center ' >
                <div className="search-box  mr-3 hidden  sm:block ">
                    <button type='button' title='search' className="btn-search flex  justify-center items-center  "><IoMdSearch className=" " size={22} /> </button>
                    <input type="text" className="input-search" placeholder="search tasks..." />
                </div>
                <h3 className={tasks}>Tasks</h3>
            </header>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {list.map(
                                (
                                    {
                                        title,
                                        description,
                                        id,
                                        displayDescription,
                                        isCompleted,
                                        dueDate,
                                    },
                                    index
                                ) => (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className={taskContainer}>
                                                    <div className="checkbox flex pt-3 ">
                                                        <div>
                                                            <div>
                                                                <MdDragIndicator
                                                                    size={24}
                                                                    className="text-black mr-2"
                                                                />
                                                            </div>
                                                        </div>

                                                        <input
                                                            type="checkbox"
                                                            id={id.toString()}
                                                            checked={isCompleted}
                                                            hidden
                                                            title="task status"
                                                            onChange={() => handleCompleteTask(id)}
                                                        />
                                                        <label
                                                            htmlFor={id.toString()}
                                                            className="check-box"
                                                        />
                                                    </div>
                                                    <div className="flex-1 mb-2">
                                                        <div className={`${titleContainer}`}>
                                                            <div className="flex items-center flex-1 ">
                                                                <label
                                                                    htmlFor={id.toString()}
                                                                    className={`${taskTitle} ${isCompleted ? 'line-through' : null
                                                                        } `}
                                                                >
                                                                    {title}
                                                                </label>

                                                                <FiEdit3
                                                                    size={20}
                                                                    className={`${editIcon}`}
                                                                    onClick={() => handleEditTask(id)}
                                                                />
                                                                <MdOutlineDelete
                                                                    size={20}
                                                                    className={`${deleteIcon}`}
                                                                    onClick={() => {
                                                                        setShowAreYouSure(id);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                className=" p-1 sm:p-1.5 md:p-2 bg-primary/10 my-1 md:my-0  ms-1 mr-2 md:mr-3 lg:mr-4 rounded-full cursor-pointer "
                                                                onClick={() => handleShowDescription(id)}
                                                            >
                                                                <BiSolidLeftArrow
                                                                    className={`${descriptionHolder} text-primary ${displayDescription ? '-rotate-[90deg]' : ''
                                                                        }`}
                                                                />
                                                            </div>
                                                        </div>
                                                        <p
                                                            className={`${taskDescription} ${displayDescription ? showDescription : ''
                                                                } `}
                                                        >
                                                            {description}

                                                            <div className='flex justify-between mt-2' >
                                                                <div className='flex md:hidden text-primary ' >
                                                                    <FiEdit3
                                                                        size={20}
                                                                        className={`mx-1`}
                                                                        onClick={() => handleEditTask(id)}
                                                                    />
                                                                    <MdOutlineDelete
                                                                        size={20}
                                                                        className={`mx-1 text-red-500 `}
                                                                        onClick={() => {
                                                                            setShowAreYouSure(id);
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div />
                                                                <time
                                                                    className="block text-right text-sm  mr-[25px] sm:mr-[30px] md:mr-[50px] font-bold text-slate-400"
                                                                    title={moment(dueDate).format(
                                                                        'MMMM Do YYYY, h:mm:ss a'
                                                                    )}
                                                                >
                                                                    {moment(dueDate).fromNow()}
                                                                </time>
                                                            </div>

                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <AreYouSure
                show={showAreYouSure}
                setShow={setShowAreYouSure}
                handleDeleteTask={handleDeleteTask}
            />
        </main>
    );
};

export default Task;

interface DisplayProps {
    show: string;
    setShow: Dispatch<React.SetStateAction<string>>;
    handleDeleteTask: (id: string) => void;
}
const AreYouSure = ({ show, setShow, handleDeleteTask }: DisplayProps) => {
    return (
        <Modal
            ariaHideApp={false}
            isOpen={show !== '-1'}
            className={'modal_1'}
            onRequestClose={() => {
                setShow('-1');
            }}
            shouldCloseOnOverlayClick
            overlayClassName="overlay_1"
        >
            <div className={'bg-white rounded-md p-1 max-w-[400px] m-3 '}>
                <GrClose
                    className="block  ml-auto bg-whiteFade rounded-full cursor-pointer p-2.5 mb-3"
                    size={36}
                    onClick={() => {
                        setShow('-1');
                    }}
                />

                <div className=" w-[85%] mx-auto pb-6  text-center  ">
                    <SlClose className=" text-red-500 mx-auto " size={48} />

                    <h3 className="text-xl font-semibold text-slate-700 mt-5  ">
                        Are you sure ?
                    </h3>
                    <p className="text-base text-slate-500 py-3 ">
                        Do you really want to delete these records? This process cannot be
                        undone.
                    </p>

                    <div className="my-2">
                        <button
                            type="button"
                            className="mx-2 bg-gray-400 text-white px-2 py-1 rounded-md"
                            onClick={() => {
                                setShow('-1');
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="mx-2 bg-red-500 text-white px-2 py-1 rounded-md"
                            onClick={() => {
                                handleDeleteTask(show);
                                setShow('-1');
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
