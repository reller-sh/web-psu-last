import 'styles/global.scss'
import App, {AppProps, AppContext} from 'next/app'
import {ApolloProvider} from '@apollo/client';
import fp from 'lodash/fp';
import {AnimatePresence} from 'framer-motion';
import {useRouter} from 'next/router';
import Link from 'next/link';
import jwt from 'jsonwebtoken';

import {GeneralCtx} from 'Components/GeneralCtx';
import {useApollo} from 'Lib/apollo';
import {useCookies} from 'Lib/hooks/useCookies';
import {baseEnv} from 'Lib/utils/consts';
import {ModalManager} from 'Components/ModalManager';


interface IAppProps extends AppProps {
    cookie: string
    host: string
    editAccess: boolean
}


// You may use layout animations.
// Example https://github.com/reller-sh/ioas/blob/5830f191b53323f0b3ac9fecfd63d89ea780466f/pages/_app.js#L8

function RootApp({Component, pageProps, cookie, host, editAccess}: IAppProps) {
	const cookies = useCookies(cookie, host)
	const {route} = useRouter()
	const client = useApollo(pageProps, cookies.get(baseEnv.another.token));

	return (
		<ApolloProvider client={client}>
			<GeneralCtx
				externalData={{
					ui: {
						accessToken: cookies.get(baseEnv.another.token) || null
					}
				}}
			>
				<ModalManager>
					<AnimatePresence exitBeforeEnter>
						<div className="d-flex w-100 bg-light py-2 px-3">
							<ul className="nav">
								<li className="nav-item">
									<Link href={'/'} passHref>
										<a className="nav-link">
											Home
										</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link href={'/auth'} passHref>
										<a className="nav-link">
											Auth
										</a>
									</Link>
								</li>
								{editAccess &&
									<li className="nav-item">
										<Link href={'/create'} passHref>
											<a className="nav-link">
												Create Survey
											</a>
										</Link>
									</li>
								}
							</ul>
						</div>
						<Component {...pageProps} key={route} />
					</AnimatePresence>
				</ModalManager>
			</GeneralCtx>
		</ApolloProvider>

	)
}


RootApp.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);
	let editAccess = false;
	try {
		editAccess = fp.isObject(await jwt.verify(fp.get('ctx.req.cookies.token', appContext), 'secret'))
	} catch (e) {

	}
	return {
		...appProps,
		editAccess,
		cookie: fp.get('ctx.req.headers.cookie', appContext),
		host: fp.get('ctx.req.headers.host', appContext)
	}
}


export default RootApp
