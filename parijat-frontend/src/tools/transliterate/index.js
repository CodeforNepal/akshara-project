// MAJOR WIP

export const DEVANAGARI_CONSONANTS = {
	ka: 'क',
	kha: 'ख',
	ga: 'ग',
	gha: 'घ',
	nga: 'ङ',

	cha: 'च',
	chha: 'छ',
	ja: 'ज',
	jha: 'झ',
	'~na': 'ञ',

	Ta: 'ट',
	Tha: 'ठ',
	Da: 'ड',
	Dha: 'ढ',
	Na: 'ण',

	ta: 'त',
	tha: 'थ',
	da: 'द',
	dha: 'ध',
	na: 'न',

	pa: 'प',
	pha: 'फ',
	ba: 'ब',
	bha: 'भ',
	ma: 'म',

	ya: 'य',
	ra: 'र',
	la: 'ल',
	va: 'व',
	wa: 'व',
	sa: 'स',
	sha: 'श',
	Sa: 'ष',
	ha: 'ह'
};

export const DEVANAGARI_DIACRITIC_VOWELS = {
	'': '्',
	aa: 'ा',
	A: 'ा',
	i: 'ि',
	ee: 'ी',
	I: 'ी',
	u: 'ु',
	oo: 'ू',
	U: 'ू',
	e: 'े',
	ai: 'ै',
	o: 'ो',
	au: 'ौ'
};

export const DEVANAGARI_INDEPENDENT_VOWELS = {
	a: 'अ',
	aa: 'आ',
	i: 'इ',
	ee: 'ई',
	u: 'उ',
	oo: 'ऊ',
	e: 'ए',
	ai: 'ऐ',
	o: 'ओ',
	au: 'औ'
};

function empty(text) {
	return text == null || text.length === 0;
}

function exceptLast(text) {
	return text.slice(0, -1);
}

function last(text) {
	return text.slice(-1);
}

export function genKeymap(consonants, diacriticVowels, independentVowels) {
	const fullKeymap = Object.assign({}, independentVowels);
	const latinConsonants = Object.keys(consonants);
	const latinDiacriticVowels = Object.keys(diacriticVowels);
	latinConsonants.forEach(consonant => {
		latinDiacriticVowels.forEach(diacritic => {
			const base = exceptLast(consonant);
			fullKeymap[`${consonant}`] = `${consonants[consonant]}`;
			fullKeymap[`${base}${diacritic}`] = `${consonants[consonant]}${
				diacriticVowels[diacritic]
			}`;
		});
	});
	return fullKeymap;
}

function getValue(keymap, key) {
	return keymap[key] || keymap[key.toLowerCase()];
}

function transliterate(part1, part2 = '', result = '', keymap) {
	if (empty(part1) && empty(part2)) {
		return result;
	}
	else if (getValue(keymap, part1)) {
		return transliterate(part2, '', `${result}${getValue(keymap, part1)}`, keymap);
	}
	else if (part1.length === 1) {
		// ??
		return transliterate(part2, '', `${result}${part1}`, keymap);
	}
	return transliterate(
		exceptLast(part1),
		`${last(part1)}${part2}`,
		result,
		keymap
	);
}

export function createTransliterator(keymap) {
	return {
		transliterate: latinText => new Promise((resolve) => {
			resolve(transliterate(latinText, '', '', keymap));
		})
	};
}

export const nepaliTransliterator = createTransliterator(
	genKeymap(
		DEVANAGARI_CONSONANTS,
		DEVANAGARI_DIACRITIC_VOWELS,
		DEVANAGARI_INDEPENDENT_VOWELS
	)
);
