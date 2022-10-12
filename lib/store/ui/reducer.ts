import {actions} from 'Lib/store/ui/actions';
import {fromRawCookies} from 'Lib/hooks/useCookies';
import {baseEnv} from 'Lib/utils/consts';


export const initState = {
	accessToken: null,
	modals: [],
};


export const reducer = {
	[`${actions.setAccessToken}`]: (state: any, payload: string) => {

		fromRawCookies().set(baseEnv.another.token, payload)

		return { ...state, accessToken: payload}
	},
	[`${actions.removeAccessToken}`]: (state: any) => {

		fromRawCookies().remove(baseEnv.another.token)

		return { ...state, accessToken: null}
	},
	[`${actions.addModal}`]: (state: any, payload: any) => {
		// state.modals.set(state.modals.size, payload)
		return {
			...state,
			modals: [...state.modals, payload]
		}
	},
	[`${actions.removeAllModals}`]: (state: any) => {
		return {
			...state,
			modals: []
		}
	},
	[`${actions.removeModalByKey}`]: (state: any, key: number) => {
		state.modals[key] = null;
		return {
			...state
		}
	}
}
