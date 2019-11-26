import { FAV_ITEM } from './actionTypes';

export function favItem(item) {
	return {
		type: FAV_ITEM,
		item
	};
}
