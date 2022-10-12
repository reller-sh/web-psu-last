import fp from 'lodash/fp';
import argon2 from 'argon2'
import jwt from 'jsonwebtoken';
import {serialize} from 'cookie';

import {databaseConnection} from 'Lib/db';


const handler = async (req, res) => {

	switch (fp.lowerCase(req.method)) {

	case 'get':

		await jwt.verify(req.body.access_token, 'secret', {}, (_, cbRes) => {
			if (_)
				res.status(401).json({ result: cbRes })
			else
				res.status(200).json({ result: cbRes })
		})
		break;
	case 'post':
		const result = (await databaseConnection('directus_users').select('id', 'password').where({email: req.body.email}).first())

		if (await argon2.verify(result.password, req.body.password)) {
			await jwt.sign({id: result.id}, 'secret', {}, (...cs) => {
				res.setHeader(
					'Set-Cookie',
					serialize('token', cs[1], {
						path: '/',
						expires: new Date('2023-11-02T09:46:51.948Z')
					}));
				res.status(200).json({ access_token: cs[1] })
			})
		}
		else
			res.status(401).json({ result: false })

		break;
	default:
		res.status(405).json({ result: false })
	}
}

export default handler;
