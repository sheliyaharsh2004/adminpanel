import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decremented, incremented } from '../../Redux/Action/Counter.action';

function Counter(props) {

    const dispatch = useDispatch()
    const con = useSelector(state => state.counter)

    const handleincrement =() => {
        dispatch(incremented())
    }
    const handledecremet =() => {
        dispatch(decremented())
    }

    return (
        <div>
            <button onClick={()=> handleincrement()}>+</button>
            <p>{con.counter}</p>
            <button onClick={()=> handledecremet()}>-</button>
        </div>
    );
}

export default Counter;