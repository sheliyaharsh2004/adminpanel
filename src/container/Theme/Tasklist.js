import React, { useContext } from 'react';
import { Taskcontext } from './TasContextProvider';

function Tasklist(props) {
    const { tasks } = useContext(Taskcontext)
    return tasks.length ? (
        <div>
            {
                tasks.map(tasks => {
                    return (
                        <>
                            <h2> {tasks.id} </h2>
                            <h4> {tasks.title} </h4>
                            <p> {tasks.priority} </p>
                        </>
                    )
                })
            }
        </div>
    ):
    (
        <div>no</div>
    )
}

export default Tasklist;