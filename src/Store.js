import { createStore } from 'redux';
import myReducer from './Reducers/Index';

const store = createStore(myReducer);

export default store;