import React, {useReducer} from 'react';
import fp from 'lodash/fp';

import {GenCtx} from 'Lib/utils'
import {fromStateGetter, reducer} from 'Lib/store';


export const GeneralCtx: React.FC<{externalData?: any}> = ({
	children,
	externalData = {},
}) => {

	const [state, dp] = useReducer<any>(reducer, fp.merge(fromStateGetter('initState'), externalData));

	return (
		<GenCtx.Provider value={{state, dp}}>
			{children}
		</GenCtx.Provider>
	)
}
