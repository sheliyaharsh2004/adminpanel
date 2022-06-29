import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootreducer } from './Reducer/Index';

export const counterStore = () => {
    let store = createStore(rootreducer, applyMiddleware(thunk))

    return store ;
}