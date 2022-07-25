import { TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import Listitem from './Listitem';

function UseCallBack(props) {

    const [dark, setDark] = useState(false)
    const [number, setNumber] = useState([])
    
    const theme = {
        backgroundColor : dark ? "#fff" : "#000",
        color : dark ? "#000" : "#fff"
    }

    console.log(number);

    const getItem = useCallback( 
        (i) => {
            return [ i+number, i+number+1, i+number+2 ]
        }, [number]
    )

    return (
        <div style={theme}>
            <button onClick={() => setDark(!dark)}> Change Theme</button> <br/><br/>
            <TextField type="text" placeholder='please Enter Number' onChange={(e) => {setNumber(parseInt(e.target.value))}}/>

            <Listitem getItem={getItem} />
        </div>
    );
}

export default UseCallBack;