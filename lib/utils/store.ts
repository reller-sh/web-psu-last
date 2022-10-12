import fp from 'lodash/fp';


type ActionCreator<TPayload = any> =
// eslint-disable-next-line no-unused-vars
    (($payload: TPayload) => { type: string; $payload: TPayload; })
    & { toString: () => string; namespace: () => string; }

const createAction = <TPayload>(type: string) => Object.assign(
	($payload: TPayload) => {
		// console.log(type, $payload);
		return ({type, $payload});
	},
	{
		toString: () => type,
		namespace: () => type.split('/')[0]
	}
);


export const createActionNamespace = (namespace: string) => <TPayload = any>(type: string): ActionCreator<TPayload> => createAction<TPayload>(`${namespace}/${type}`);


const unfoldReducer: any = fp.pipe(
	fp.mapValues(s => fp.isFunction(s) ? s : unfoldReducer(s)),
);
