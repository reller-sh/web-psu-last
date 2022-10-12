import {DocumentNode, OperationVariables, TypedDocumentNode} from '@apollo/client/core';
import {QueryHookOptions, QueryResult} from '@apollo/client/react/types/types';
import {useQuery} from '@apollo/client';
import {useEffect} from 'react';

// import {createSystemApolloClient} from "Lib/apollo";

/* eslint-disable no-unused-vars */
interface SystemQueryHook {
    <TData = any, TVariables = OperationVariables>(
        query: DocumentNode | TypedDocumentNode<TData, TVariables>,
        options?: QueryHookOptions<TData, TVariables>
    ): QueryResult<TData, TVariables>
}

/* eslint-enable no-unused-vars */

export const useSystemQuery: SystemQueryHook = (query, options) => {


	const queryResult = useQuery(query, {
		...options,
	})

	useEffect(() => {

		(async () => queryResult.refetch())()

	}, [queryResult, queryResult.refetch])

	return queryResult
}
