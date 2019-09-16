import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import SearchBox from '../../src/components/searchbox';

storiesOf('SearchBox', module).add('without settings', () => (
	<SearchBox
		queryFields={{
			'title': 'शिर्षक',
			'author': 'लेखक'
		}}
		onSubmit={queryValue => {
			console.log(queryValue);
		}}
	/>
));
