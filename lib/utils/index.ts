import React, {Dispatch} from 'react';


export const GenCtx =
    React.createContext<undefined | {
        dp: Dispatch<any>,
        state: any
    }>(undefined);
