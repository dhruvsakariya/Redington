import React, { Dispatch, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    completeTask,
    deleteTask,
    showTaskDescription,
    todoState,
} from '../../store/todo/todoSlice';
import { BiSolidLeftArrow } from 'react-icons/bi';
import { IoMdSearch } from 'react-icons/io';
import { BiPlus } from 'react-icons/bi';
import { FiEdit3 } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { MdOutlineDelete } from 'react-icons/md';
import { SlClose } from 'react-icons/sl';
import Modal from 'react-modal';

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

const Task = () => {
    const [showAreYouSure, setShowAreYouSure] = useState(-1);

    const { list } = useAppSelector(todoState);
    const dispatch = useAppDispatch();

    const handleShowDescription = (id: number) => {
        dispatch(showTaskDescription(id));
    };

    const handleCompleteTask = (id: number) => {
        dispatch(completeTask(id));
    };

    const handleDeleteTask = (id: number) => {
        dispatch(deleteTask(id));
    };

    return (
        <main className=" w-full sm:w-[80%] md:w-[75%] lg:w-[60%]  mx-auto   px-[12px] sm:px-[24px] md:px-[32px] lg:px-[40px] py-2 mb-10  rounded-md mt-0 sm:mt-4 md:mt-8 lg:mt-10 shadow ">
            <div className="flex items-center  my-8">
                <h1 className={title}>Productivity Powerhouse</h1>
                <div className="border-slate-300/75 border rounded-full cursor-pointer mx-3 p-2 ">
                    <IoMdSearch className="text-slate-500 " size={22} />
                </div>
                <div className="bg-primary p-2 mx-3 rounded-full cursor-pointer">
                    <BiPlus className="text-white" size={22} />
                </div>
            </div>

            <header className="mb-6">
                <h3 className={tasks}>Tasks</h3>
            </header>

            <section>
                {list.map(
                    ({
                        title,
                        description,
                        id,
                        displayDescription,
                        isCompleted,
                        dueDate,
                    }) => {
                        return (
                            <div className={taskContainer} key={id}>
                                <div className="checkbox flex pt-3 ">
                                    <input
                                        type="checkbox"
                                        id={id.toString()}
                                        checked={isCompleted}
                                        hidden
                                        title="task status"
                                        onChange={() => handleCompleteTask(id)}
                                    />
                                    <label htmlFor={id.toString()} className="check-box" />
                                </div>
                                <div>
                                    <div className={`${titleContainer}`}>
                                        <div className="flex items-center flex-1 ">
                                            <label
                                                htmlFor={id.toString()}
                                                className={`${taskTitle} ${isCompleted ? 'line-through' : null
                                                    } `}
                                            >
                                                {title}
                                            </label>

                                            <FiEdit3 size={20} className={`${editIcon}`} />
                                            <MdOutlineDelete
                                                size={20}
                                                className={`${deleteIcon}`}
                                                onClick={() => {
                                                    setShowAreYouSure(id);
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="p-2 bg-primary/10 mr-4 rounded-full cursor-pointer"
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

                                        <time
                                            className="block text-right text-sm mr-[50px] font-bold text-slate-400 mt-2"
                                            title={moment(dueDate).format('MMMM Do YYYY, h:mm:ss a')}
                                        >
                                            {moment(dueDate).fromNow()}
                                        </time>
                                    </p>
                                </div>
                            </div>
                        );
                    }
                )}
            </section>
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
    show: number;
    setShow: Dispatch<React.SetStateAction<number>>;
    handleDeleteTask: (id: number) => void;
}
const AreYouSure = ({ show, setShow, handleDeleteTask }: DisplayProps) => {
    return (
        <Modal
            ariaHideApp={false}
            isOpen={show !== -1}
            className={'modal_1'}
            onRequestClose={() => {
                setShow(-1);
            }}
            shouldCloseOnOverlayClick
            overlayClassName="overlay_1"
        >
            <div className={'bg-white rounded-md p-1 max-w-[400px] m-3 '}>
                <GrClose
                    className="block  ml-auto bg-whiteFade rounded-full cursor-pointer p-2.5 mb-3"
                    size={36}
                    onClick={() => {
                        setShow(-1);
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
                                setShow(-1);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="mx-2 bg-red-500 text-white px-2 py-1 rounded-md"
                            onClick={() => {
                                handleDeleteTask(show);
                                setShow(-1);
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
