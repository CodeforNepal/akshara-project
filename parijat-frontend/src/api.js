export const INDEX_NAME = `akshara_nepali`;

export const API_ENDPOINT =
	process.env.NODE_ENV === 'production'
		? `/es/`
		: `http://parijat.kabootar.im:9200/`;

export function getContent(id, index = INDEX_NAME, _type = '_doc') {
	return fetch(`${API_ENDPOINT}${index}/${_type}/${id}`).then(response =>
		response.json()
	);
}

export function getSuggestions(
	query,
	fields = ['title', 'author'],
	size = 7,
	index = INDEX_NAME
) {
	const body = {
		_source: fields,
		query: {
			bool: {
				must: [
					{
						bool: {
							must: [
								{
									bool: {
										should: fields.map(fieldName => ({
											multi_match: {
												query,
												fields: [fieldName],
												type: 'best_fields',
												operator: 'or',
												fuzziness: 0
											}
										})),
										minimum_should_match: '1'
									}
								}
							]
						}
					}
				]
			}
		},
		size,
		from: 0
	};
	return fetch(`${API_ENDPOINT}${index}/_search`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(res => Promise.resolve(res.hits.hits.map(hit => hit._source)));
}
