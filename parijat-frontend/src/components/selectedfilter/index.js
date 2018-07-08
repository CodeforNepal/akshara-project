import { h } from 'preact';
import Icon from 'preact-material-components/Icon';
import style from './style';

const SelectedFilter = props => (
	<span className={style.SelectedFilter}>
		<span className={style.SelectedFilter__Label}>
			<strong>{props.labelKey}:</strong> {props.labelValue}
		</span>
		<Icon
			title="Remove Filter"
			className={style.SelectedFilter__Icon}
			onClick={props.removeFilter}
		>
			close
		</Icon>
	</span>
);

export default SelectedFilter;