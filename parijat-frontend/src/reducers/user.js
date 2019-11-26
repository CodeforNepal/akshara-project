import { FAV_ITEM } from '../actions/actionTypes';

let initialState = {
	favs: []
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case FAV_ITEM:
			return { ...state, favs: [...state.favs, action.item] };
		default:
			return state;
	}
}
