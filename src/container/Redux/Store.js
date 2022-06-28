import { createStore } from 'redux'

export const counterStore = () => {
    let store = createStore(rootreducer)

    return store ;
}