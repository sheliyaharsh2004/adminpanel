import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../Redux/Action/Counter.action';

function Counter(props) {

    const dispatch = useDispatch()
    const con = useSelector(state => state.counter)

    const handleincrement =() => {
        dispatch(increment())
    }
    const handledecremet =() => {
        dispatch(decrement())
    }

    return (
        <div className="align-items-center">
            <button 
                className="border-0"
                onClick={()=> handleincrement()}>
                <b>+</b>    
            </button>
            <b><p className='mb-2 mt-2 '>{con.counter}</p></b>
            <button 
                className="border-0"
                onClick={()=> handledecremet()}>
                <b>-</b>
            </button>
        </div>
    );
}

export default Counter;