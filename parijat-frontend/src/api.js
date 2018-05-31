export const INDEX_NAME = `akshara_nepali_kavita`;

export const API_ENDPOINT =
	process.env.NODE_ENV === 'production'
		? `/es/`
		: `http://0.0.0.0:9200/`;

export function getContent(id, index = INDEX_NAME, _type = '_doc') {
	return fetch(`${API_ENDPOINT}${index}/${_type}/${id}`).then(response =>
		response.json()
	);
}
