export const INDEX_NAME = `akshara_nepali_kavita`;

export const API_ENDPOINT =
	process.env.NODE_ENV === 'production'
		? `/es/${INDEX_NAME}`
		: `http://parijat.kabootar.im:9200/${INDEX_NAME}`;

export function getContent(id, index = INDEX_NAME, _type = '_doc') {
	return fetch(`${API_ENDPOINT}/${_type}/${id}`).then(response =>
		response.json()
	);
}
