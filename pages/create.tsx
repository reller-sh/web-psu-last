import {NextPage} from 'next';
import {useForm} from 'react-hook-form';
import axios from 'axios';


const Create: NextPage = () => {

	const {
		handleSubmit,
		register
	} = useForm({
		defaultValues: {
			title: '',
			status: ''
		},
	})

	const createReq = async (data: any) => {
		alert(JSON.stringify((await axios.post('/api/surveys', data)).data))
	}

	return (
		<form className={'p-4'} onSubmit={handleSubmit(createReq)}>
			<div className=" mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Survey name"
					{...register('title')}
				/>
			</div>
			<div className={'my-3'}>
				<div className="form-floating">
					<select
						className="form-select"
						id="floatingSelect"
						aria-label="Floating label select example"
						{...register('status')}

					>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
						<option value="archived">Archived</option>
					</select>
					<label htmlFor="floatingSelect">Works with selects</label>
				</div>
			</div>

			<button className={'btn btn-primary'}>
				Update
			</button>
		</form>
	)
}


export default Create;
