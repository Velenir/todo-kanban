import {combineReducers} from 'redux';

import todos from './todoReducer';
import filter from './filterReducer';

export default combineReducers({
	todos,
	filter
});
