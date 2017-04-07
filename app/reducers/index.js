import {combineReducers} from 'redux';

import lists from './listsReducer';
import modal from './modalReducer';
import descriptions from './descriptionsReducer';
import layout from './layoutReducer';


export default combineReducers({
	lists,
	modal,
	descriptions,
	layout
});
