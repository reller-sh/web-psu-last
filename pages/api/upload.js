import fp from 'lodash/fp';
import jwt from 'jsonwebtoken';
import mv from 'mv';
import { IncomingForm } from 'formidable'


export const config = {
	api: {
		bodyParser: false,
		sizeLimit: '100mb',
	}
};

const handler = async (req, res) => {

	switch (fp.lowerCase(req.method)) {
	case 'post':

		await jwt.verify(req.cookies.token, 'secret', {}, async error => {
			if (!error) {

				const form = new IncomingForm()

				form.parse(req, (err, fields, files) => {
					if (err)
						return res.status(401).json({ result: false })
					console.log(fields, files)
					console.log(files.file.filepath)
					let oldPath = files.file.filepath;
					let newPath = `./public/uploads/${files.file.originalFilename}`;
					mv(oldPath, newPath, function(err) {
					});
					res.status(200).json({ fields, files })
				})
			} else
				res.status(401).json({ result: false })
		})
		break;
	default:
		res.status(405).json({ result: false })
	}
}

export default handler;
