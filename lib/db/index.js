import knex from 'knex';


export const databaseConnection = knex({
	client: 'pg',
	version: '13',
	connection: {
		host: '127.0.0.1',
		port: '5432',
		user: 'directus',
		password: 'directus',
		database: 'directus',
	}
})
