import React from 'react'

const tasks = [
    {
        title: 'Setup GitHub repository',
        description: 'Begin by establishing a Redington GitHub repository, and then proceed to push your code while adhering to the conventional commit guidelines.'
    },
]

const Task = () => {
    return (
        <section>

            <input type='checkbox' title='mark complete' id='2' />
            <label htmlFor='2'  >Setup GitHub repository</label>

        </section>
    )
}

export default Task