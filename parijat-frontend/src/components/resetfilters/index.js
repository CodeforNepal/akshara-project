import { h } from 'preact';
import { X } from 'preact-feather';
import style from './style.css';

export default ({ hasFilters, translate, resetFilters }) =>
	hasFilters ? (
		<span className={style.ResetFilters} onClick={resetFilters}>
			<div>
				<span>{translate('reset.clear_all')}</span>
				<X className={style.ResetFilters__Icon} />
			</div>
		</span>
	) : null;
