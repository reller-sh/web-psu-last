import fp from 'lodash/fp';
import jwt from 'jsonwebtoken';
import {randomUUID} from 'crypto';

import {databaseConnection} from 'Lib/db';


const handler = async (req, res) => {

	console.log(req.body)
	switch (fp.lowerCase(req.method)) {
	case 'post':
		await jwt.verify(req.cookies.token, 'secret', {}, async error => {
			if (!error) {
				await databaseConnection('surveys').insert({id: randomUUID(), ...req.body})
				res.status(200).json({ result: true })
			} else
				res.status(401).json({ result: false })
		})
		break;
	case 'get':
		const result = await databaseConnection.raw(`
		select * 
		from surveys
		where 
		    lower(title) like :title or
		    lower(status) like :title;
		`, { title: `%${fp.lowerCase(req.query.title)}%` })
		res.status(200).json(result.rows)
		break;
	default:
		res.status(405).json({result: false})
	}
}

export default handler;
