import {initState, reducer} from './reducer';
import {actions, ui} from './actions';


export const uiState = {
	initState,
	reducer,
	actions,
	namespace: ui('').namespace()
}
