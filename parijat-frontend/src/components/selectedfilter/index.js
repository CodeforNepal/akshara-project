import { h } from 'preact';
import { X } from 'preact-feather';
import style from './style';

const SelectedFilter = props => (
	<span className={style.SelectedFilter}>
		<span className={style.SelectedFilter__Label}>
			<strong>{props.labelKey}:</strong> {props.labelValue}
		</span>
		<X
			title="Remove Filter"
			className={style.SelectedFilter__Icon}
			onClick={props.removeFilter}
		/>
	</span>
);

export default SelectedFilter;
