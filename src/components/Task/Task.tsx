import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { todoState } from '../../store/todo/todoSlice';

import styles from "./Task.module.css";
const { myButton } = styles;

const Task = () => {
    const { list } = useAppSelector(todoState);
    const dispatch = useAppDispatch();

    return (
        <main>

            <h1>Productivity Powerhouse</h1>

            <header>
                <h3 className={myButton} >Tasks</h3>
            </header>

            <section>


                {list.map(({ title, description, id }) => {
                    return (
                        <div className="flex items-start" key={id}>
                            <div className="checkbox">
                                <input type="checkbox" id={id.toString()} hidden title="task status" />
                                <label htmlFor={id.toString()} className="check-box" />
                            </div>
                            <div>
                                <label htmlFor={id.toString()}>{title}</label>
                                <p>{description}</p>
                            </div>
                        </div>
                    );
                })}
            </section>
        </main>
    );
};

export default Task;




