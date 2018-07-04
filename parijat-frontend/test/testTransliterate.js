import expect from 'expect';
import {
	genKeymap,
	createTransliterator,
	DEVANAGARI_CONSONANTS,
	DEVANAGARI_DIACRITIC_VOWELS,
	DEVANAGARI_INDEPENDENT_VOWELS
} from '../src/tools/transliterate';

describe('tools/transliterate', () => {
	const devanagariKeymap = genKeymap(
		DEVANAGARI_CONSONANTS,
		DEVANAGARI_DIACRITIC_VOWELS,
		DEVANAGARI_INDEPENDENT_VOWELS
	);

	const devanagariTransliterator = createTransliterator(devanagariKeymap);

	const correctTransliterations = {
		namaste: 'नमस्ते',
		'sa~njaya': 'सञ्जय'
	};

	Object.keys(correctTransliterations).forEach(latinText => {
		it(`transliterates "${latinText}" correctly`, async () => {
			const transliteratedText = await devanagariTransliterator.transliterate(
				latinText
			);
			expect(transliteratedText).toBe(correctTransliterations[latinText]);
		});
	});
});
