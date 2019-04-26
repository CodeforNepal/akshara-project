import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import SearchBox from '../../src/components/searchbox';

storiesOf('SearchBox', module).add('without settings', () => (
	<SearchBox
		fields={['title', 'author']}
		onSubmit={queryValue => {
			console.log(queryValue);
		}}
	/>
));
