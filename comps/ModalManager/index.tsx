import {motion} from 'framer-motion'
import fp from 'lodash/fp';
import React from 'react';

import {createActionNamespace} from 'Lib/utils/store';
import {useSelector} from 'Lib/hooks/useState';


const createType = createActionNamespace('modalType')

export const modalTypes = {
	notification: createType('notification'),
	notNot: createType('nn'),
}

// TODO: make notification & modal ui
// TODO: create logic (hook or pure func) delete notification after timeout.

const modals = {
	[`${modalTypes.notification}`]: () => <div>s</div>,
	[`${modalTypes.notNot}`]: () => <div>s</div>,
}

type IModals = {
    type: string
    [i: string]: any
}


const notifyFilter = fp.filter<IModals>({type: `${modalTypes.notification}`})


export const ModalManager: React.FC = ({children}) => {

	const modalList = useSelector('ui.modals')

	const notifications = notifyFilter(modalList)
	const specModals = fp.difference<IModals>(modalList)(notifications)

	return (
		<motion.div className={'position-relative vw-100 vh-100'}>
			<motion.div
				className={'position-absolute bottom-0 end-0 d-flex flex-column'}
				style={{
					zIndex: 1000
				}}
			>
				{notifications
					.map(
						(
							{type, ...props},
							index
						) => {
							const Component = modals[type]
							return <Component key={String(index)} {...props} />;
						})}
			</motion.div>
			{specModals
				.map(
					(
						{type, ...props},
						index
					) => {
						const Component = modals[type]
						return (
							<motion.div
								style={{
									zIndex: 500,
								}}
								key={String(index)}
							>
								<Component {...props} />
							</motion.div>
						);
					})}
			{children}
		</motion.div>
	)
}
