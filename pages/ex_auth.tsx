import {NextPage} from 'next';
import {useMutation} from '@apollo/client';

import AUTH from 'gql/system/auth.graphql'
import REFRESH from 'gql/system/refresh.graphql'
import {useDispatch} from 'Lib/hooks/useState';
import {uiState} from 'Lib/store/ui';


const Home: NextPage = () => {

	const dp = useDispatch()

	const [auth] = useMutation(AUTH, {
		variables: {
			// email: 'master@volki.digital',
			// password: '86xxx'
		},
		onCompleted: data => {
			dp(uiState.actions.setAccessToken(data.auth_login.access_token))
			localStorage.setItem('refresh_token', data.auth_login.refresh_token)
		},
	})

	const [refresh] = useMutation(REFRESH, {
		onCompleted: data => {
			dp(uiState.actions.setAccessToken(data.auth_refresh.access_token))
			localStorage.setItem('refresh_token', data.auth_refresh.refresh_token)
		},
	})


	return (
		<>
			<button
				className={'btn btn-success'}
				onClick={() => auth()}
			>
				auth
			</button>
			<button
				className={'btn btn-success'}
				onClick={() => refresh({
					variables: {
						refresh: localStorage.getItem('directus_refresh_token')
					}
				})}
			>
				update
			</button>

		</>
	)
}

export default Home
