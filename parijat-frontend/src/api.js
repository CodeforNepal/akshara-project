export const INDEX_NAME = `akshara_nepali`;

export const API_ENDPOINT =
	process.env.NODE_ENV === 'production'
		? `/es/`
		: `https://sangraha.org/es/`;

export function getContent(id, index = INDEX_NAME, _type = '_doc') {
	return fetch(`${API_ENDPOINT}${index}/${_type}/${id}`).then(response =>
		response.json()
	);
}

function _parseSuggestValue(suggestValue) {
  return [ ... new Set(suggestValue[0].options.map(x => x.text)) ];
}

export function getSuggestions(
	query,
	fields = ['title', 'author'],
	size = 7,
	index = INDEX_NAME
) {
  const body = {
    "_source": fields,
    "suggest": fields.reduce((result, fieldName) => ({
        ...result,
       [`${fieldName}-suggest`]: {
         "prefix": query,
         "completion": {
         "field": `${fieldName}.suggest`,
         "fuzzy": false,
         "size": 5
        }
      }
    }), {}),
  };

	return fetch(`${API_ENDPOINT}${index}/_search`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(res => {
      return Object.keys(res.suggest)
        .reduce((result, suggestKey) => ({
          ...result,
          [suggestKey]: _parseSuggestValue(res.suggest[suggestKey])
        }), {});
    });
}
