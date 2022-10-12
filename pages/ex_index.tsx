import {GetServerSideProps, NextPage} from 'next';
import {useQuery} from '@apollo/client';
import fp from 'lodash/fp';

import {useDispatch, useSelector} from 'Lib/hooks/useState';
import {uiState} from 'Lib/store/ui';
import {modalTypes} from 'Components/ModalManager';
import BASE_IO from 'gql/system/baseIo.graphql'


const Home: NextPage = () => {

	const poi = useSelector('ui.defaultValue')
	const dp = useDispatch()

	const {data, loading, refetch, error} = useQuery(BASE_IO)
	// useQuery(BASE_SECOND)


	return (
		<div className={'bg-one_cc'}>
			{JSON.stringify(error)}
			<div className='bg-success'>
				{loading || JSON.stringify(data)}
			</div>
			{poi}
			<button className='btn' onClick={() => dp(uiState.actions.setAccessToken('dev_key_undef_not_exist'))}>
				add
			</button>
			<button className='btn' onClick={() => dp(uiState.actions.removeAccessToken(null))}>
				remove
			</button>
			<button className='btn' onClick={() => refetch()}>
				refetch
			</button>
			<button className={'btn'} onClick={() => dp(uiState.actions.addModal({
				type: `${modalTypes.notNot}`
			}))}>
				modal
			</button>

			{JSON.stringify(fp.filter({io: 2}, [{io: 'ss'}, {io: 2}]))}
			{/*<button className='btn' onClick={() => remove()}>*/}
			{/*    remove*/}
			{/*</button>*/}
			{/*<button className='btn' onClick={() => add()}>*/}
			{/*    add*/}
			{/*</button>*/}
			{/*<DisCom />*/}
			{/*<div className={'btn-one_cc btn'}>*/}
			{/*    xs ss*/}
			{/*</div>*/}
			{/*{cookie.get('id')}*/}
		</div>
	)
}


export const getServerSideProps: GetServerSideProps = async ctx => {

	console.log(ctx)
	return {
		props: {}
	}
}

export default Home
