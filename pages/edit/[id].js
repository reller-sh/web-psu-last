import {useForm} from 'react-hook-form'
import axios from 'axios';
import {useRouter} from 'next/router';

import {databaseConnection} from 'Lib/db';


const EditSurvey = ({survey}) => {

	const {query} = useRouter()
	const {
		handleSubmit,
		register
	} = useForm({
		defaultValues: survey,
	})

	const updateReq = async data => {
		// alert(JSON.stringify(data))
		alert(JSON.stringify((await axios.put(`/api/surveys/${query.id}`, data)).data))
	}

	return (
		<form className={'p-4'} onSubmit={handleSubmit(updateReq)}>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Survey name"
					{...register('title')}
				/>
				<input
					type="text"
					className="form-control"
					placeholder="Status"
					{...register('status')}
				/>
			</div>

			<button className={'btn btn-primary'}>
				Update
			</button>
		</form>
	);
};

export const getServerSideProps = async props => {
	return {
		props: {
			survey: JSON.parse(JSON.stringify(await databaseConnection('surveys').where({
				id: props.query.id
			}).first()))
		}
	}
}

export default EditSurvey;
