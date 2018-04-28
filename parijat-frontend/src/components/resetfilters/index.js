import { h } from 'preact';
import Chips from 'preact-material-components/Chips';
import 'preact-material-components/Chips/style.css';
import 'preact-material-components/Button/style.css';
import { Chip } from '../selectedfilter';

export default ({ hasFilters, translate, resetFilters }) =>
	hasFilters ? (
		<Chip
			onClick={resetFilters}
		>
			<Chips.Text>{translate('reset.clear_all')}</Chips.Text>
			<Chips.Icon>close</Chips.Icon>
		</Chip>
	) : null;
