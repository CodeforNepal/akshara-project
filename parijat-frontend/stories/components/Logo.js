import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import Logo from '../../src/components/logo';

storiesOf('Logo', module).add('default', () => (
	<div style={{ height: '200px' }}>
		<Logo />
	</div>
));
