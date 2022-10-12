import Link from 'next/link';
import fp from 'lodash/fp';
import {useForm} from 'react-hook-form';
import {useEffect} from 'react';
import useAxios from 'axios-hooks';

import {databaseConnection} from 'Lib/db';


const Index = ({
	resp = [],
	bulkAccess,
}) => {

	const {
		register,
		handleSubmit,
		watch
	} = useForm({
		defaultValues: {
			search: ''
		},
	})

	const [{
		data,
		loading,
	}, fetch] = useAxios(
		{
			method: 'get',
			url: '/api/surveys'
		}, {
			manual: true
		}
	)

	const [{loading: deletingSurvey}, fetchDelete] = useAxios(
		{
			method: 'delete',
			url: ''
		}, {
			manual: true
		}
	)

	const handleDeleteSurvey = id => {
		fetchDelete({
			method: 'delete',
			url: '/api/surveys/' + id
		}).then(() => {
			alert('Deleted !')
			fetch().then()
		})
	}

	useEffect(() => {
		const watcher = watch((value, meta) => {
			console.log()
			if (meta.name === 'search' && !loading) {
				fetch({
					params: {
						title: value.search
					}
				})
			}
		})
		return () => {
			watcher.unsubscribe()
		}
	}, [fetch, loading, watch])


	return (
		<div className={'p-4'}>
			<form onSubmit={handleSubmit(data => console.log(data))}
				  className={'row align-items-center'}>
				<h1 className={'col-auto'}>
					Surveys
				</h1>
				<div className={'col-auto'}>
					<input
						{...register('search')}
						type="email" className="form-control" id="searchInput"
						placeholder={'Search'}
						aria-describedby="emailHelp"/>
				</div>
			</form>
			<table className={'table table-bordered mt-3 border-primary'}>
				<thead>
					<tr>
						<th colSpan={1}>ID</th>
						<th scope="col" colSpan={2}>Title</th>
						<th scope="col" colSpan={2}>Status</th>
						{bulkAccess || (<th scope="col" colSpan={2}></th>)}
					</tr>
				</thead>
				<tbody>
					{(data || resp).map((value, index) => (
						<tr key={String(index)}>
							<th colSpan={1}>
								{value.id}
							</th>
							<th colSpan={2}>
								{value.title}
							</th>
							<th colSpan={2}>
								{value.status}
							</th>
							{bulkAccess || (
								<th colSpan={2} className={'d-flex justify-content-around align-items-center'}>
									<Link href={`/edit/${value.id}`} passHref>
										<a>
											Edit
										</a>
									</Link>
									<button
										disabled={deletingSurvey}
										className={'btn btn-danger'}
										onClick={() => handleDeleteSurvey(value.id)}
									>
										Delete
									</button>
								</th>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Index;


export const getServerSideProps = async ctx => {
	const returnee = await databaseConnection.raw('SELECT * FROM surveys;')
	return {
		props: {
			bulkAccess: fp.isEmpty(ctx.req.cookies?.token),
			resp: JSON.parse(JSON.stringify(returnee?.rows))
		}
	}
}
