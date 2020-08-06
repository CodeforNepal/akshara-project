export const INDEX_NAME = `akshara_nepali`;

export const API_ENDPOINT =
	process.env.NODE_ENV === 'production' ? `/es/` : `http://localhost:9200/`;

export const BHUPI_ENDPOINT =
	process.env.NODE_ENV === 'production' ? `/bhupi/` : `http://127.0.0.1:3000/`;

export function getContent(id, index = INDEX_NAME, _type = '_doc') {
	return fetch(`${API_ENDPOINT}${index}/${_type}/${id}`).then(response =>
		response.json()
	);
}

function _parseSuggestValue(suggestValue) {
	return Array.from(new Set(suggestValue[0].options.map(x => x.text)));
}

export function getSuggestions(
	query,
	fields = ['title', 'author'],
	size = 7,
	index = INDEX_NAME
) {
	const body = {
		_source: fields,
		suggest: fields.reduce(
			(result, fieldName) => ({
				...result,
				[`${fieldName}-suggest`]: {
					prefix: query,
					completion: {
						field: `${fieldName}.suggest`,
						fuzzy: false,
						size: 5
					}
				}
			}),
			{}
		)
	};

	return fetch(`${API_ENDPOINT}${index}/_search`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(res => Object.keys(res.suggest).reduce(
			(result, suggestKey) => ({
				...result,
				[suggestKey]: _parseSuggestValue(res.suggest[suggestKey])
			}),
			{}
		));
}

export function login({ username, password }) {
	return fetch(`${BHUPI_ENDPOINT}auth/login`, {
		method: 'POST',
		body: JSON.stringify({ username, password }),
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(response => response.json());
}


export function remotePull() {
	return fetch(`${BHUPI_ENDPOINT}sync/pull`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		}
	}).then(response => response.json());
}

export function remotePush() {
	return fetch(`${BHUPI_ENDPOINT}sync/push`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		}
	}).then(response => response.json());
}

export function createContent(newContent) {
	return fetch(`${BHUPI_ENDPOINT}content`, {
		method: 'POST',
		body: JSON.stringify(newContent),
		headers: {
			'content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token')
		}
	}).then(response => response.json());
}
