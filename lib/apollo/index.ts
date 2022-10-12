import {setContext} from '@apollo/client/link/context';
import {ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache} from '@apollo/client';
import {isEqual, merge} from 'lodash';
import {useMemo} from 'react';
import {onError} from '@apollo/client/link/error';
import fp from 'lodash/fp';
import {RetryLink} from '@apollo/client/link/retry';

import {baseEnv} from 'Lib/utils/consts';
import {fromRawCookies} from 'Lib/hooks/useCookies';
import REFRESH from 'gql/system/refresh.graphql'


export const authLink = (token?: string | null) => setContext((_, {headers}) => ({
	headers: {
		...headers,
		authorization: token ? `Bearer ${token}` : null,
	},
}));

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

// @ts-ignore
let apolloClient;


const errorTemplate = {
	message: 'Token expired.'
}


const errorLink = onError(({forward, operation, graphQLErrors, networkError}) => {
	if (fp.get('statusCode', networkError) === 401) {
		const cookie = fromRawCookies()
		cookie.remove(baseEnv.another.token)
		const refresh = localStorage.getItem('refresh_token')
		if (fp.findIndex(errorTemplate, graphQLErrors) && !fp.isEmpty(refresh)) {
			const client = new ApolloClient({
				uri: baseEnv.backendUrls.system,
				cache: new InMemoryCache()
			})
			// eslint-disable-next-line no-debugger
			// debugger
			client.mutate({
				mutation: REFRESH,
				variables: {
					refresh
				}
			}).then(({data}) => {

				localStorage.setItem('refresh_token', data.auth_refresh.refresh_token)
				const token = data.auth_refresh.access_token
				cookie.set(baseEnv.another.token, token)
				const oldHeaders = operation.getContext().headers;

				operation.setContext({
					headers: {
						...oldHeaders,
						authorization: `Bearer ${token}`,
					}
				});
				return forward(operation)
			})
		}
	}

	if (graphQLErrors) {
		graphQLErrors.forEach(({message, locations, path}) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	}
	if (networkError)
		console.log(`[Network error]: ${networkError}`);
});


const linkCascade = () => ApolloLink.split(
	({operationName}) => baseEnv.another.schemaRegexp().test(operationName),
	createHttpLink({uri: baseEnv.backendUrls.system}),
	createHttpLink({uri: baseEnv.backendUrls.gql}),
)


export const createApolloClient = (token?: string | null) => new ApolloClient({
	link: from([
		authLink(token),
		new RetryLink(),
		errorLink,
		linkCascade()
	]),
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					// events: relayStylePagination(),
				},
			},
		},
	}),
});


export const initializeApollo = (initialState = null, token: string | null = null) => {
	// @ts-ignore
	const _apolloClient = apolloClient ?? createApolloClient(token)

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();

		// Merge the existing cache into data passed from getStaticProps/getServerSideProps
		const data = merge(initialState, existingCache, {
			// combine arrays using object equality (like in sets)
			arrayMerge: (destinationArray: any, sourceArray: any) => [
				...sourceArray,
				...destinationArray.filter((d: any) =>
					sourceArray.every((s: any) => !isEqual(d, s))),
			],
		});

		// Restore the cache with the merged data
		_apolloClient.cache.restore(data);
	}
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined')
		return _apolloClient;
	// Create the Apollo Client once in the client
	// @ts-ignore
	if (!apolloClient)
		apolloClient = _apolloClient;

	return _apolloClient;
};

export function addApolloState(client: any, pageProps: any) {
	if (pageProps?.props)
	// eslint-disable-next-line no-param-reassign
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();


	return pageProps;
}

export function useApollo(pageProps: any, token?: string) {
	const state = pageProps[APOLLO_STATE_PROP_NAME];
	return useMemo(() => initializeApollo(state, token), [state, token]);
}
