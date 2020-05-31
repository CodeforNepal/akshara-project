import {
	FAV_ITEM,
	SET_TRANSLITERATION_ENABLED
} from '../actions/actionTypes';

let initialState = {
	transliteration: true,
	favs: []
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case FAV_ITEM:
			return { ...state, favs: [...state.favs, action.item] };
		case SET_TRANSLITERATION_ENABLED:
			return { ...state, transliteration: action.item };
		default:
			return state;
	}
}
