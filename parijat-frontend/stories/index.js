import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import SearchBox from '../src/components/searchbox';

storiesOf('SearchBox', module)
	.add('with text', () => <button>Hello Button</button>)
	.add('with emoji', () => (
		<button
			fields={['title', 'author']}
			onSubmit={queryValue => {
        console.log(queryValue);
			}}
		/>
	));
