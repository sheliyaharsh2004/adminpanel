import * as ActionType from '../ActionType'

const initalstate = {
    counter : 0
}

export const Counterreducer  = (state=initalstate , action) => {

    switch (action.type) {
        case ActionType.INCREMENTED :
            return {
                ...state,
                counter : state.counter +1
            }
        case ActionType.DECREMENTED :
            return {
                ...state,
                counter : state.counter -1
            }   
        default : 
            return state;     
    }
}