import { h } from 'preact';
import get from 'lodash/get';
import Chips from 'preact-material-components/Chips';
import 'preact-material-components/Chips/style.css';
import style from './style';

export class Chip extends Chips.Chip {
	componentWillUnmount() {
		return;
	}
}

export default props => (
	<Chip>
		<Chips.Text>
			<strong>{props.labelKey}:</strong> {props.labelValue}
		</Chips.Text>
		<Chips.Icon
			className="material-icons"
			trailing
			tabindex="0"
			role="button"
			title="Remove Filter"
			onClick={props.removeFilter}
		>
			close
		</Chips.Icon>
	</Chip>
);
