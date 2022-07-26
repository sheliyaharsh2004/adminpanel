import React, { createContext } from 'react';
import { useReducer } from 'react';
import * as ActionType from './ActionType';
import { ThemeReducer } from './Reducer/theme.reducer';

export const Taskcontext = createContext();

const intVal = {
    theme : 'light',
}

function TasContextProvider({children}) {

    const [state, dispatch] = useReducer(ThemeReducer, intVal) 

    const Toogle_Theme = (theme) => {
        const newTheme = theme === 'light' ? "dark" : " light";
        dispatch({type: ActionType.TOOGLE_THEME, payload : newTheme})
    }

    return (
        <Taskcontext.Provider value={{ ...state, Toogle_Theme}}>
            {children}
        </Taskcontext.Provider>
    );
}

export default TasContextProvider;