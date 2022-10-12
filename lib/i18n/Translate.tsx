import React from 'react';

import { useTranslations } from 'Lib/i18n/index';


interface ITranslate {
    name: string
}

export const Translate: React.FC<ITranslate> = ({ name }) => {
	const t = useTranslations(null);
	return (
		<>
			{t(name)}
		</>
	);
};
