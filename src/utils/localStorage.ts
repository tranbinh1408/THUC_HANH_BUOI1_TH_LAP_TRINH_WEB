export const loadFromLocalStorage = (key: string, defaultValue: any) => {
	try {
		const serializedValue = localStorage.getItem(key);
		if (serializedValue === null) {
			return defaultValue;
		}
		return JSON.parse(serializedValue);
	} catch (error) {
		console.error('Error loading from localStorage:', error);
		return defaultValue;
	}
};

export const saveToLocalStorage = (key: string, value: any) => {
	try {
		const serializedValue = JSON.stringify(value);
		localStorage.setItem(key, serializedValue);
	} catch (error) {
		console.error('Error saving to localStorage:', error);
	}
};
