import React, { createContext, useReducer } from 'react';
import * as ActionType from './ActionType';
import { ThemeReducer } from './Reducer/theme.reducer';

const ThemeContext = createContext();

const intVal = {
    theme : 'light',
}

 export const ThemeProvider = ({children}) => {

    const [state, dispatch] = useReducer(ThemeReducer, intVal) 

    const toogle_theme = (theme) => {
        const newtheme = theme === 'light' ? "dark" : "light"
        
        dispatch({type: ActionType.TOOGLE_THEME, payload : newtheme})
    }

    return (
        <ThemeContext.Provider value={{ ...state, toogle_theme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;