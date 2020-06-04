import { h } from 'preact';
import { Trash2 } from 'preact-feather';
import style from './style.css';

export default ({ hasFilters, translate, resetFilters }) =>
	hasFilters ? (
		<span className={style.ResetFilters} onClick={resetFilters}>
			<Trash2 className={style.ResetFilters__Icon} />
			<span>{translate('reset.clear_all')}</span>
		</span>
	) : null;
