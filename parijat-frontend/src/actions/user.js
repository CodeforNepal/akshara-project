import { FAV_ITEM, SET_TRANSLITERATION_ENABLED } from './actionTypes';

export function favItem(item) {
	return {
		type: FAV_ITEM,
		item
	};
}

export function setTransliterationEnabled(isEnabled) {
	return {
		type: SET_TRANSLITERATION_ENABLED,
		item: isEnabled,
	};
}
