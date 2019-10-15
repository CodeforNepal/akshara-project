import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import TransliteratedInput from '../../src/components/transliteratedinput';

storiesOf('TransliteratedInput', module).add('default', () => (
	<TransliteratedInput />
));
