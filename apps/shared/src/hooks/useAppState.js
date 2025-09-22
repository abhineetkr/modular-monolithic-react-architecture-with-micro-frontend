import { useState, useEffect } from 'react';
import appStore from '../store/AppStore';

export const useAppState = () => {
	const [state, setState] = useState(appStore.getState());

	useEffect(() => {
		appStore.init();
		setState(appStore.getState());

		const unsubscribe = appStore.subscribe((newState) => {
			setState(newState);
		});

		return unsubscribe;
	}, []);

	return {
		...state,
		login: appStore.login.bind(appStore),
		logout: appStore.logout.bind(appStore),
		updateUser: appStore.updateUser.bind(appStore),
		setCurrentModule: appStore.setCurrentModule.bind(appStore)
	};
};