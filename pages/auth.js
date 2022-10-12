import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import axios from 'axios';


const Auth = () => {
	const {push} = useRouter()
	const {
		handleSubmit,
		register
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const auth = data => {
		axios.post('/api/auth', data).then(async () => {
			alert('Authorized !')
			await push('/')
		}).catch(
			() => alert('Wrong password or email !')
		)
	}

	return (<>
		<form className={'p-4'} onSubmit={handleSubmit(auth)}>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Email"
					{...register('email')}
				/>
			</div>
			<div className="input-group mb-3">
				<input
					type="password"
					className="form-control"
					placeholder="Password"
					{...register('password')}
				/>
			</div>

			<button className={'btn btn-primary'}>
				Login
			</button>
		</form>
	</>)
}

export default Auth;
