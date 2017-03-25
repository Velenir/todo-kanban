import {combineReducers} from 'redux';

import lists from './listsReducer';
import modal from './modalReducer';


export default combineReducers({
	lists,
	modal
});
