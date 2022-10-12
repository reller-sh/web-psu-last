import fp from 'lodash/fp';
import {useContext} from 'react';

import {GenCtx} from 'Lib/utils';


export const useSelector = (path:string) => fp.get(`state.${path}`, useContext(GenCtx));

export const useDispatch = () => {
	const dp = useContext(GenCtx)?.dp;
	return dp || fp.noop
};


export const useData = () => useContext(GenCtx);
