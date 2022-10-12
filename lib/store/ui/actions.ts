import {createActionNamespace} from 'Lib/utils/store';


export const ui = createActionNamespace('ui');


export const actions = {
	setAccessToken: ui('SET_ACCESS_TOKEN'),
	removeAccessToken: ui('REMOVE_ACCESS_TOKEN'),
	addModal: ui('CREATE_MODAL'),
	removeAllModals: ui('CLEAR_ALL_MODALS'),
	removeModalByKey: ui('CLOSE_MODAL_BY_KEY'),
};
