import fp from 'lodash/fp';

import {uiState} from 'Lib/store/ui';


export type IAction = {
    type: string
    $payload: any
}

type IReducer = {
    // eslint-disable-next-line no-unused-vars
    [k: string]: (...args: any) => any
}

type IPartState = {
    reducer: IReducer,
    initState: any,
    namespace: string,
    actions: any,
}

type IState = {
    [k: string]: IPartState
}

export const stateBundle: IState = {
	uiState
}


export const fromStateGetter = (type: 'reducer' | 'initState' | 'namespace') => {
	const typeGetter = fp.get(type)
	switch (type) {
	case 'initState':
		return fp.reduce((p, c) => ({...p, [`${c.namespace}`]: typeGetter(c)}), {}, stateBundle);
	case 'namespace':
		return fp.reduce(
			(p, c) => ({...p, [typeGetter(c)]: Object.keys(p).length}),
			{},
			stateBundle);
	case 'reducer':
		return fp.reduce((p, c) => ({...p, ...typeGetter(c)}), {}, stateBundle);
	default:
		throw 'Unused type!'
	}
}


export const reducer = (state: any, action: IAction) => {
	const namespace = action.type.split('/')[0];

	const r: IReducer = fromStateGetter('reducer');

	console.log(state, action)
	return {
		...state,
		[`${namespace}`]: r[`${action.type}`](state[namespace], action.$payload),
	};
};
