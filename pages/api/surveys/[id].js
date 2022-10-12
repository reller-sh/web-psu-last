import fp from 'lodash/fp';
import jwt from 'jsonwebtoken';

import {databaseConnection} from 'Lib/db';


const handler = async (req, res) => {

	console.log(req.body)
	switch (fp.lowerCase(req.method)) {
	case 'get':
		const result = await databaseConnection('surveys').where({id: req.query.id})
		res.status(200).json(result)
		break;
	case 'put':
		await jwt.verify(req.cookies.token, 'secret', {}, async error => {
			if (!error) {
				await databaseConnection('surveys').where({id: req.query.id}).update(req.body)
				res.status(200).json({ result: true })
			} else
				res.status(401).json({ result: false })
		})
		break;
	case 'delete':
		await jwt.verify(req.cookies.token, 'secret', {}, async error => {
			if (!error) {
				await databaseConnection('surveys').where({id: req.query.id}).delete()
				res.status(200).json({result: true})
			} else
				res.status(401).json({ result: false })
		})
		break;
	default:
		res.status(405).json({ result: false })
	}
}

export default handler;
