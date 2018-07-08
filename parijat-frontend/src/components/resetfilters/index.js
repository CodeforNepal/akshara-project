import { h } from 'preact';
import Icon from 'preact-material-components/Icon';
import style from './style.css';

export default ({ hasFilters, translate, resetFilters }) =>
	hasFilters ? (
		<span className={style.ResetFilters} onClick={resetFilters}>
			<div>
				<span>{translate('reset.clear_all')}</span>
				<Icon className={style.ResetFilters__Icon}>close</Icon>
			</div>
		</span>
	) : null;
