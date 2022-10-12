const url = `https://${process.env.NEXT_PUBLIC_BASE_URL}/`

const backendUrls = {
	base: `${url}`,
	gql: `${url}graphql/`,
	system: `${url}graphql/system/`,
	assets: `${url}assets/`,
}


const colors = {
	one_cc: 'yellow'
}


const another = {
	token: 'access_token',
	schemaRegexp: () => /SYSTEM/gm
}


type PseudoMap<T> = { [k: string]: T }


type IBaseEnv = {
    backendUrls: PseudoMap<string>
    colors: PseudoMap<string>
    another: {
        token: string
        schemaRegexp: () => RegExp
    }
}


export const baseEnv: IBaseEnv = {
	backendUrls,
	colors,
	another,
}
