
import fp from 'lodash/fp';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

import I18N from 'Lib/apollo/schemas/service/i18n.graphql';
import { initializeApollo } from 'Lib/apollo';

import t from './translations.json';


const client = initializeApollo();

export const useTranslations = (external: any) => {
	const { locale } = useRouter();
	return (name:string) => fp.getOr(name, 'value', fp.find({ name, lang: { code: locale } }, fp.isEmpty(external) ? t : external));
};


export const withTranslation = async ({
	ctx,
	path,
	returnee = {},
}: { ctx: GetServerSidePropsContext, path?: string, returnee?: any}) => {
	const { data: { i18n: translations } } = await client.query({
		query: I18N,
		variables: {
			module: fp.isEmpty(path) ? ctx.resolvedUrl.split('?')[0] : path,
			language: ctx.locale,
		},
	});
	return fp.merge({ props: { translations } }, returnee);
};
